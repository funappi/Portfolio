/* Bokeh : lumières hors champ en forme d'iris (WebGL), avec repli CSS en mode léger. */
(function () {
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };

  const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
  const FS = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uFocus; uniform float uGlow;
uniform vec3 uBase; uniform vec3 uPal[8];
#define N 34
#define PI 3.14159265
float h(float n){ return fract(sin(n*127.1)*43758.5453); }
float poly(vec2 p, float n, float rot){
  float a = atan(p.y,p.x)+rot; float s = 2.*PI/n;
  float r = cos(PI/n)/cos(mod(a,s)-PI/n);
  return length(p)/r;
}
void main(){
  vec2 uv = gl_FragCoord.xy/uRes; float asp = uRes.x/uRes.y;
  vec2 p = vec2(uv.x*asp, uv.y);
  vec2 m = vec2(uMouse.x*asp, uMouse.y);
  vec3 col = uBase*(0.75+0.5*uv.y);
  float md = length(p-m);
  col += uPal[0]*0.16*uGlow*exp(-md*md*5.0);
  col += uPal[1]*0.10*exp(-pow(length(p-vec2(asp*0.15,1.05)),2.)*2.5);
  col += uPal[2]*0.08*exp(-pow(length(p-vec2(asp*0.9,-0.05)),2.)*2.5);
  for(int i=0;i<N;i++){
    float fi=float(i);
    float z=h(fi+3.1);
    vec2 c=vec2(h(fi+1.7)*asp, h(fi+9.3));
    float sp=0.025+0.05*h(fi+5.5);
    c += vec2(sin(uTime*sp+fi*1.3), cos(uTime*sp*0.8+fi*2.1))*(0.05+0.09*z);
    c.y = mod(c.y + uTime*0.004*(0.3+z), 1.3)-0.15;
    c += (m-vec2(asp*0.5,0.5))*(0.02+0.07*z);
    float size=(0.035+0.15*z*z)*(1.0+uFocus*0.55);
    float soft=clamp(0.06+0.35*(1.0-z)*0.6+uFocus*0.5,0.04,0.9);
    float d=poly((p-c)/size, 7.0, 0.35);
    float disc=smoothstep(1.0,1.0-soft,d);
    float rim=smoothstep(1.0-soft*0.9,1.0,d)*(1.0-uFocus)*0.6;
    float a=disc*(0.42+rim);
    int k=int(mod(fi,8.0));
    vec3 pc=uPal[0];
    for(int j=0;j<8;j++){ if(j==k) pc=uPal[j]; }
    float tw=0.75+0.25*sin(uTime*0.6+fi*4.0);
    col += pc*a*(0.13+0.22*z)*tw;
  }
  col = col/(1.0+col*0.55);
  float g=fract(sin(dot(gl_FragCoord.xy+uTime,vec2(12.9898,78.233)))*43758.5453);
  col += (g-0.5)*0.018;
  gl_FragColor=vec4(col,1.0);
}`;

  const Bokeh = {
    mode: "max",
    cur: { base: [0.03, 0.03, 0.06], pal: Array.from({ length: 8 }, () => [0.5, 0.5, 0.8]), focus: 1, glow: 0.6 },
    tgt: { base: [0.03, 0.03, 0.06], pal: Array.from({ length: 8 }, () => [0.5, 0.5, 0.8]), focus: 0.35, glow: 0.6 },
    mouse: [0.5, 0.55], mouseT: [0.5, 0.55],
    init(canvas, lite) {
      this.canvas = canvas; this.lite = lite;
      addEventListener("pointermove", (e) => { this.mouseT = [e.clientX / innerWidth, 1 - e.clientY / innerHeight]; }, { passive: true });
      this.setMode(document.documentElement.dataset.fx || "max");
    },
    setMode(mode) {
      this.mode = mode;
      if (mode === "max" && !this.gl) this._initGL();
      const on = mode === "max" && this.gl;
      this.canvas.hidden = !on;
      this.lite.hidden = !!on;
      if (on && !this.raf) this._loop();
      if (!on && this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; }
    },
    _initGL() {
      const gl = this.canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
      if (!gl) { this.gl = null; return; }
      const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(o)); return o; };
      const pr = gl.createProgram();
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { this.gl = null; return; }
      gl.useProgram(pr);
      const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      this.u = {}; ["uRes", "uTime", "uMouse", "uFocus", "uGlow", "uBase", "uPal"].forEach((n) => (this.u[n] = gl.getUniformLocation(pr, n)));
      this.gl = gl;
      const rs = () => { const s = Math.min(devicePixelRatio || 1, 2) * 0.5; this.canvas.width = Math.round(innerWidth * s); this.canvas.height = Math.round(innerHeight * s); gl.viewport(0, 0, this.canvas.width, this.canvas.height); };
      addEventListener("resize", rs); rs();
      this.t0 = performance.now();
    },
    /* palette: [fond, c1, c2, c3] ; ou une liste de 8 couleurs pour l'accueil */
    setPalette(colors, focus) {
      const base = hex(colors[0]);
      this.tgt.base = base.map((v) => v * 0.9);
      const lights = colors.length >= 9 ? colors.slice(1, 9) : [1, 2, 3, 1, 2, 1, 3, 2].map((i) => colors[i]);
      this.tgt.pal = lights.map(hex);
      if (focus !== undefined) this.tgt.focus = focus;
      // repli CSS
      const r = document.documentElement.style;
      r.setProperty("--b0", colors[0]); r.setProperty("--b1", lights[0]); r.setProperty("--b2", lights[1]); r.setProperty("--b3", lights[2]);
    },
    setFocus(f) { this.tgt.focus = f; },
    _loop() {
      const gl = this.gl, u = this.u;
      const step = () => {
        this.raf = requestAnimationFrame(step);
        if (document.hidden) return;
        const c = this.cur, t = this.tgt, k = 0.045;
        c.base = c.base.map((v, i) => v + (t.base[i] - v) * k);
        c.pal = c.pal.map((col, j) => col.map((v, i) => v + (t.pal[j][i] - v) * k));
        c.focus += (t.focus - c.focus) * 0.06;
        this.mouse = this.mouse.map((v, i) => v + (this.mouseT[i] - v) * 0.06);
        gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height);
        gl.uniform1f(u.uTime, (performance.now() - this.t0) / 1000);
        gl.uniform2f(u.uMouse, this.mouse[0], this.mouse[1]);
        gl.uniform1f(u.uFocus, c.focus);
        gl.uniform1f(u.uGlow, t.glow);
        gl.uniform3fv(u.uBase, c.base);
        gl.uniform3fv(u.uPal, c.pal.flat());
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      step();
    }
  };
  window.Bokeh = Bokeh;
})();
