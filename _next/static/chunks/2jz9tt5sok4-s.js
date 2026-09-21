(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,15746,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(75056),a=e.i(94800),o=e.i(31067),n=e.i(90072),s=e.i(70950),s=s,l=e.i(48546),u=n;let h=parseInt(n.REVISION.replace(/\D+/g,""));class m extends u.ShaderMaterial{constructor(e=new u.Vector2){super({uniforms:{inputBuffer:new u.Uniform(null),depthBuffer:new u.Uniform(null),resolution:new u.Uniform(new u.Vector2),texelSize:new u.Uniform(new u.Vector2),halfTexelSize:new u.Uniform(new u.Vector2),kernel:new u.Uniform(0),scale:new u.Uniform(1),cameraNear:new u.Uniform(0),cameraFar:new u.Uniform(1),minDepthThreshold:new u.Uniform(0),maxDepthThreshold:new u.Uniform(1),depthScale:new u.Uniform(0),depthToBlurRatioBias:new u.Uniform(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${h>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:u.NoBlending,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class d{constructor({gl:e,resolution:t,width:r=500,height:i=500,minDepthThreshold:a=0,maxDepthThreshold:o=1,depthScale:s=0,depthToBlurRatioBias:l=.25}){this.renderToScreen=!1,this.renderTargetA=new n.WebGLRenderTarget(t,t,{minFilter:n.LinearFilter,magFilter:n.LinearFilter,stencilBuffer:!1,depthBuffer:!1,type:n.HalfFloatType}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new m,this.convolutionMaterial.setTexelSize(1/r,1/i),this.convolutionMaterial.setResolution(new n.Vector2(r,i)),this.scene=new n.Scene,this.camera=new n.Camera,this.convolutionMaterial.uniforms.minDepthThreshold.value=a,this.convolutionMaterial.uniforms.maxDepthThreshold.value=o,this.convolutionMaterial.uniforms.depthScale.value=s,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=l,this.convolutionMaterial.defines.USE_DEPTH=s>0;const u=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),h=new Float32Array([0,0,2,0,0,2]),d=new n.BufferGeometry;d.setAttribute("position",new n.BufferAttribute(u,3)),d.setAttribute("uv",new n.BufferAttribute(h,2)),this.screen=new n.Mesh(d,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,r){let i,a,o,n=this.scene,s=this.camera,l=this.renderTargetA,u=this.renderTargetB,h=this.convolutionMaterial,m=h.uniforms;m.depthBuffer.value=t.depthTexture;let d=h.kernel,f=t;for(a=0,o=d.length-1;a<o;++a)i=(1&a)==0?l:u,m.kernel.value=d[a],m.inputBuffer.value=f.texture,e.setRenderTarget(i),e.render(n,s),f=i;m.kernel.value=d[a],m.inputBuffer.value=f.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(n,s)}}var f=n;class c extends f.MeshStandardMaterial{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;null!=(t=e.defines)&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}let v=r.forwardRef(({mixBlur:e=0,mixStrength:t=1,resolution:i=256,blur:u=[0,0],minDepthThreshold:h=.9,maxDepthThreshold:m=1,depthScale:f=0,depthToBlurRatioBias:v=.25,mirror:p=0,distortion:x=1,mixContrast:g=1,distortionMap:_,reflectorOffset:w=0,...S},D)=>{(0,s.e)({MeshReflectorMaterialImpl:c});let M=(0,l.useThree)(({gl:e})=>e),T=(0,l.useThree)(({camera:e})=>e),U=(0,l.useThree)(({scene:e})=>e),B=(u=Array.isArray(u)?u:[u,u])[0]+u[1]>0,y=u[0],b=u[1],F=r.useRef(null);r.useImperativeHandle(D,()=>F.current,[]);let[R]=r.useState(()=>new n.Plane),[j]=r.useState(()=>new n.Vector3),[C]=r.useState(()=>new n.Vector3),[E]=r.useState(()=>new n.Vector3),[A]=r.useState(()=>new n.Matrix4),[V]=r.useState(()=>new n.Vector3(0,0,-1)),[z]=r.useState(()=>new n.Vector4),[P]=r.useState(()=>new n.Vector3),[k]=r.useState(()=>new n.Vector3),[I]=r.useState(()=>new n.Vector4),[L]=r.useState(()=>new n.Matrix4),[W]=r.useState(()=>new n.PerspectiveCamera),N=r.useCallback(()=>{var e;let t=F.current.parent||(null==(e=F.current)||null==(e=e.__r3f.parent)?void 0:e.object);if(!t||(C.setFromMatrixPosition(t.matrixWorld),E.setFromMatrixPosition(T.matrixWorld),A.extractRotation(t.matrixWorld),j.set(0,0,1),j.applyMatrix4(A),C.addScaledVector(j,w),P.subVectors(C,E),P.dot(j)>0))return;P.reflect(j).negate(),P.add(C),A.extractRotation(T.matrixWorld),V.set(0,0,-1),V.applyMatrix4(A),V.add(E),k.subVectors(C,V),k.reflect(j).negate(),k.add(C),W.position.copy(P),W.up.set(0,1,0),W.up.applyMatrix4(A),W.up.reflect(j),W.lookAt(k),W.far=T.far,W.updateMatrixWorld(),W.projectionMatrix.copy(T.projectionMatrix),L.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),L.multiply(W.projectionMatrix),L.multiply(W.matrixWorldInverse),L.multiply(t.matrixWorld),R.setFromNormalAndCoplanarPoint(j,C),R.applyMatrix4(W.matrixWorldInverse),z.set(R.normal.x,R.normal.y,R.normal.z,R.constant);let r=W.projectionMatrix;I.x=(Math.sign(z.x)+r.elements[8])/r.elements[0],I.y=(Math.sign(z.y)+r.elements[9])/r.elements[5],I.z=-1,I.w=(1+r.elements[10])/r.elements[14],z.multiplyScalar(2/z.dot(I)),r.elements[2]=z.x,r.elements[6]=z.y,r.elements[10]=z.z+1,r.elements[14]=z.w},[T,w]),[O,G,H,$]=r.useMemo(()=>{let r={minFilter:n.LinearFilter,magFilter:n.LinearFilter,type:n.HalfFloatType},a=new n.WebGLRenderTarget(i,i,r);a.depthBuffer=!0,a.depthTexture=new n.DepthTexture(i,i),a.depthTexture.format=n.DepthFormat,a.depthTexture.type=n.UnsignedShortType;let o=new n.WebGLRenderTarget(i,i,r),s=new d({gl:M,resolution:i,width:y,height:b,minDepthThreshold:h,maxDepthThreshold:m,depthScale:f,depthToBlurRatioBias:v}),l={mirror:p,textureMatrix:L,mixBlur:e,tDiffuse:a.texture,tDepth:a.depthTexture,tDiffuseBlur:o.texture,hasBlur:B,mixStrength:t,minDepthThreshold:h,maxDepthThreshold:m,depthScale:f,depthToBlurRatioBias:v,distortion:x,distortionMap:_,mixContrast:g,"defines-USE_BLUR":B?"":void 0,"defines-USE_DEPTH":f>0?"":void 0,"defines-USE_DISTORTION":_?"":void 0};return[a,o,s,l]},[M,y,b,L,i,p,B,e,t,h,m,f,v,x,_,g]);return(0,a.useFrame)(()=>{var e;let t=F.current.parent||(null==(e=F.current)||null==(e=e.__r3f.parent)?void 0:e.object);if(!t)return;t.visible=!1;let r=M.xr.enabled,i=M.shadowMap.autoUpdate;N(),M.xr.enabled=!1,M.shadowMap.autoUpdate=!1,M.setRenderTarget(O),M.state.buffers.depth.setMask(!0),M.autoClear||M.clear(),M.render(U,W),B&&H.render(M,O,G),M.xr.enabled=r,M.shadowMap.autoUpdate=i,t.visible=!0,M.setRenderTarget(null)}),r.createElement("meshReflectorMaterialImpl",(0,o.default)({attach:"material",key:"key"+$["defines-USE_BLUR"]+$["defines-USE_DEPTH"]+$["defines-USE_DISTORTION"],ref:F},$,S))}),p="#C9A040";function x({blocks:e,kind:i,color:a,emissive:o,tier:s}){let l=(0,r.useMemo)(()=>e.filter(e=>e.kind===i),[e,i]),u=(0,r.useRef)(null);return((0,r.useMemo)(()=>{if(!u.current)return;let e=new n.Matrix4;l.forEach((t,r)=>{e.compose(new n.Vector3(t.x,t.h/2,t.z),new n.Quaternion,new n.Vector3(t.w,t.h,t.d)),u.current.setMatrixAt(r,e)}),u.current.instanceMatrix.needsUpdate=!0},[l]),l.length)?(0,t.jsxs)("instancedMesh",{ref:e=>{if(!e)return;u.current=e;let t=new n.Matrix4;l.forEach((r,i)=>{t.compose(new n.Vector3(r.x,r.h/2,r.z),new n.Quaternion,new n.Vector3(r.w,r.h,r.d)),e.setMatrixAt(i,t)}),e.instanceMatrix.needsUpdate=!0},args:[void 0,void 0,l.length],castShadow:"high"===s,receiveShadow:"high"===s,children:[(0,t.jsx)("boxGeometry",{args:[1,1,1]}),(0,t.jsx)("meshStandardMaterial",{color:a,roughness:o?.35:.78,metalness:o?.25:.05,emissive:o??"#000000",emissiveIntensity:.3*!!o})]}):null}function g({tier:e}){let i=(0,r.useMemo)(()=>{let e=[];for(let t=-1;t<=1;t++)e.push({x:4.6*t,z:-1.2,w:.05,d:9.5});for(let t=-1;t<=1;t++)e.push({x:0,z:3.45*t-1.2,w:17,d:.05});return e},[]);return"low"===e?null:(0,t.jsx)("group",{children:i.map((e,r)=>(0,t.jsxs)("mesh",{position:[e.x,.012,e.z],rotation:[-Math.PI/2,0,0],children:[(0,t.jsx)("planeGeometry",{args:[e.w,e.d]}),(0,t.jsx)("meshBasicMaterial",{color:p,transparent:!0,opacity:.5})]},r))})}function _({tier:e}){return"low"===e?(0,t.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,0],children:[(0,t.jsx)("planeGeometry",{args:[60,60]}),(0,t.jsx)("meshStandardMaterial",{color:"#0C121B",roughness:.35,metalness:.5})]}):(0,t.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,0],children:[(0,t.jsx)("planeGeometry",{args:[60,60]}),(0,t.jsx)(v,{resolution:"high"===e?1024:512,mixBlur:1.1,mixStrength:26,blur:[260,80],depthScale:1.1,minDepthThreshold:.4,maxDepthThreshold:1.3,mirror:.55,color:"#0B111A",roughness:.72,metalness:.42})]})}function w({reduced:e,pointer:t}){let i=(0,r.useMemo)(()=>new n.Vector3(0,.95,-1.8),[]);return(0,a.useFrame)(({camera:r,clock:a},o)=>{let n=t.current;n&&(n.x+=(n.tx-n.x)*Math.min(1,2.2*o),n.y+=(n.ty-n.y)*Math.min(1,2.2*o));let s=e?0:.9*Math.sin(.1*a.elapsedTime);r.position.set(s+(n?.x??0)*1.1,3.5-(n?.y??0)*.5,10.6),r.lookAt(i)}),null}e.s(["default",0,function({tier:e,reduced:a,active:o,pointer:n}){let s=(0,r.useMemo)(()=>(function(e){var t;let r=(t=0x1352839,()=>{t|=0;let e=Math.imul((t=t+0x6d2b79f5|0)^t>>>15,1|t);return(((e=e+Math.imul(e^e>>>7,61|e)^e)^e>>>14)>>>0)/0x100000000}),i=[],a="low"===e?15:21,o="low"===e?8:11;for(let e=0;e<a;e++)for(let t=0;t<o;t++){if(e%4==3||t%3==2)continue;let n=(e-(a-1)/2)*1.15,s=(t-(o-1)/2)*1.15-1.2,l=Math.max(0,1-Math.hypot(n/9,(s+.5)/5.5));if(r()>.5+.5*l)continue;let u=.22+2.5*Math.pow(l,1.5)*(.45+.85*r()),h=r(),m=h>.9?2:+(h>.62);i.push({x:n+(r()-.5)*.12,z:s+(r()-.5)*.12,w:1.15*(.5+.3*r()),d:1.15*(.5+.3*r()),h:u,kind:m})}return i})(e),[e]);return(0,t.jsxs)(i.Canvas,{frameloop:o?"always":"demand",shadows:"high"===e,dpr:"high"===e?[1,1.8]:[1,1.4],gl:{antialias:"low"!==e,alpha:!0,powerPreference:"high-performance"},camera:{position:[0,3.5,10.6],fov:26},style:{background:"transparent"},children:[(0,t.jsx)("hemisphereLight",{args:["#B6D0EA","#4A3E28",2.9]}),(0,t.jsx)("ambientLight",{intensity:1.05,color:"#CFDCE9"}),(0,t.jsx)("directionalLight",{position:[5.5,8,4],intensity:2.3,color:"#FFF4DE",castShadow:"high"===e,"shadow-mapSize":[1024,1024],"shadow-camera-left":-12,"shadow-camera-right":12,"shadow-camera-top":12,"shadow-camera-bottom":-12,"shadow-bias":-8e-4}),(0,t.jsx)("directionalLight",{position:[-6,4,-5],intensity:.5,color:"#6FA8D8"}),(0,t.jsx)(_,{tier:e}),(0,t.jsx)(g,{tier:e}),(0,t.jsx)(x,{blocks:s,kind:0,color:"#E9E7E2",tier:e}),(0,t.jsx)(x,{blocks:s,kind:1,color:"#C8C5BD",tier:e}),(0,t.jsx)(x,{blocks:s,kind:2,color:"#2C3542",emissive:p,tier:e}),(0,t.jsx)("fog",{attach:"fog",args:["#111A26",30,62]}),(0,t.jsx)(w,{reduced:a,pointer:n})]})}],15746)},28507,function(e){e.n(e.i(15746))}]);