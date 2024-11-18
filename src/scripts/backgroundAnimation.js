// src/scripts/backgroundAnimation.js

const pointer = { x: 0, y: 0, tX: 0, tY: 0 };

export function initShader() {
    const canvasEl = document.querySelector("canvas#neuro");
    const vsSource = document.getElementById("vertShader").innerHTML;
    const fsSource = document.getElementById("fragShader").innerHTML;
  
    const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");
  
    if (!gl) {
      alert("WebGL is not supported by your browser.");
      return null;
    }
  
    function createShader(gl, sourceCode, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, sourceCode);
      gl.compileShader(shader);
  
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
  
      return shader;
    }
  
    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
  
    function createShaderProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
  
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
        return null;
      }
  
      return program;
    }
  
    const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
    const uniforms = getUniforms(gl, shaderProgram);
  
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
    gl.useProgram(shaderProgram);
  
    const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
    gl.enableVertexAttribArray(positionLocation);
  
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  
    return { gl, uniforms };
  }
  
  function getUniforms(gl, program) {
    let uniforms = {};
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      let uniformName = gl.getActiveUniform(program, i).name;
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
  }
  
  export function render({ gl, uniforms }) {
    const currentTime = performance.now();
  
    gl.uniform2f(uniforms.u_pointer_position, pointer.tX / window.innerWidth, 1 - pointer.tY / window.innerHeight);
  
    gl.uniform1f(uniforms.u_time, currentTime);
  
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  
    requestAnimationFrame(() => render({ gl, uniforms }));
  }
  
  export function resizeCanvas({ gl, uniforms }) {
    const canvasEl = document.querySelector("canvas#neuro");
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
  
    canvasEl.width = window.innerWidth * devicePixelRatio;
    canvasEl.height = window.innerHeight * devicePixelRatio;
    gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
    gl.viewport(0, 0, canvasEl.width, canvasEl.height);
  }
  
  export function setupEvents({ gl, uniforms }) {
    window.addEventListener("pointermove", e => {
      updateMousePosition(e.clientX, e.clientY);
    });
    window.addEventListener("touchmove", e => {
      updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    });
    window.addEventListener("click", e => {
      updateMousePosition(e.clientX, e.clientY);
    });
  
    function updateMousePosition(eX, eY) {
      console.log(`Pointer position: ${eX}, ${eY}`);
      pointer.tX = eX;
      pointer.tY = eY;
    }
  }