import { vec2 } from 'gl-matrix';

const vertexShader = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float C = texture2D(uPressure, vUv).x;
      float divergence = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + B + T - divergence) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

class FluidProgram {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  uniforms: { [key: string]: WebGLUniformLocation | null };
  attributes: { [key: string]: number };
  timeLocation: WebGLUniformLocation | null;
  buffer: WebGLBuffer | null;

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this.program = this.createProgram();
    this.uniforms = {};
    this.attributes = {};
    this.timeLocation = null;
    this.buffer = null;
    this.init();
  }

  createShader(type: number, source: string) {
    const shader = this.gl.createShader(type);
    if (!shader) throw new Error('Failed to create shader');
    
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error(this.gl.getShaderInfoLog(shader) || 'Shader compilation failed');
    }
    
    return shader;
  }

  createProgram() {
    const program = this.gl.createProgram();
    if (!program) throw new Error('Failed to create program');

    const vertShader = this.createShader(this.gl.VERTEX_SHADER, vertexShader);
    const fragShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShader);

    this.gl.attachShader(program, vertShader);
    this.gl.attachShader(program, fragShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error(this.gl.getProgramInfoLog(program) || 'Program linking failed');
    }

    return program;
  }

  init() {
    this.timeLocation = this.gl.getUniformLocation(this.program, 'uTime');
    
    const vertices = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);

    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    const positionLocation = this.gl.getAttribLocation(this.program, 'aPosition');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  render(time: number) {
    this.gl.useProgram(this.program);
    if (this.timeLocation) {
      this.gl.uniform1f(this.timeLocation, time);
    }
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }
}

export function initFluidSimulation(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl');
  if (!gl) throw new Error('WebGL not supported');

  const program = new FluidProgram(gl);
  let animationFrameId: number;
  let startTime = Date.now();

  function resizeCanvas() {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function render() {
    const time = (Date.now() - startTime) * 0.001;
    program.render(time);
    animationFrameId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  render();

  return () => {
    window.removeEventListener('resize', resizeCanvas);
    cancelAnimationFrame(animationFrameId);
  };
}