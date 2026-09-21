(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,73331,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(75056),o=e.i(94800),n=e.i(48546),a=e.i(43216),l=e.i(90072),u=e.i(16148),s=e.i(46229);let c=new l.Color("#38BDF8"),d=new l.Color("#C9A040"),m=u.APAC_MARKETS.find(e=>e.hub);function p({count:e}){let i=(0,n.useThree)(e=>e.viewport.dpr)||1,o=(0,r.useMemo)(()=>{let t=new l.BufferGeometry;return t.setAttribute("position",new l.BufferAttribute((0,s.fibonacciSphere)(e,1),3)),t},[e]),a=(0,r.useMemo)(()=>new l.ShaderMaterial({transparent:!0,depthWrite:!1,uniforms:{uSize:{value:2.5},uDpr:{value:1},uColor:{value:c.clone()},uOpacity:{value:.85}},vertexShader:`
          uniform float uSize;
          uniform float uDpr;
          varying float vFade;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vFade = smoothstep(-2.4, 0.5, mv.z);
            gl_PointSize = uSize * uDpr * (3.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,fragmentShader:`
          uniform vec3 uColor;
          uniform float uOpacity;
          varying float vFade;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = dot(c, c);
            if (d > 0.25) discard;
            float a = smoothstep(0.25, 0.04, d);
            gl_FragColor = vec4(uColor, a * uOpacity * mix(0.08, 1.0, vFade));
          }
        `}),[]);return(0,r.useMemo)(()=>{a.uniforms.uDpr.value=i},[a,i]),(0,t.jsx)("points",{geometry:o,material:a,frustumCulled:!1})}function h(){let e=(0,r.useMemo)(()=>{let e=[],t=t=>{for(let r=0;r<t.length-1;r++)e.push(t[r].x,t[r].y,t[r].z,t[r+1].x,t[r+1].y,t[r+1].z)};[-60,-30,0,30,60].forEach(e=>t((0,s.graticuleRing)("lat",e,1.001,72)));for(let e=-180;e<180;e+=30)t((0,s.graticuleRing)("lng",e,1.001,72));let r=new l.BufferGeometry;return r.setAttribute("position",new l.Float32BufferAttribute(e,3)),r},[]);return(0,t.jsx)("lineSegments",{geometry:e,frustumCulled:!1,children:(0,t.jsx)("lineBasicMaterial",{color:"#1E9FD8",transparent:!0,opacity:.085,depthWrite:!1})})}function f(){let e=(0,r.useMemo)(()=>new l.ShaderMaterial({transparent:!0,depthWrite:!1,side:l.BackSide,blending:l.AdditiveBlending,uniforms:{uColor:{value:new l.Color("#38BDF8")}},vertexShader:`
          varying vec3 vN; varying vec3 vV;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vN = normalize(normalMatrix * normal);
            vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,fragmentShader:`
          uniform vec3 uColor;
          varying vec3 vN; varying vec3 vV;
          void main() {
            float f = pow(1.0 - abs(dot(vN, vV)), 5.0);
            gl_FragColor = vec4(uColor, f * 0.85);
          }
        `}),[]);return(0,t.jsx)("mesh",{material:e,children:(0,t.jsx)("sphereGeometry",{args:[1.07,64,64]})})}function v(){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),r=t.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.25,"rgba(255,255,255,0.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=r,t.fillRect(0,0,64,64);let i=new l.CanvasTexture(e);return i.needsUpdate=!0,i}function g(){let e=(0,r.useMemo)(v,[]),i=(0,r.useRef)(null);return(0,o.useFrame)(({clock:e})=>{if(!i.current)return;let t=.3+.05*Math.sin(1.9*e.elapsedTime);i.current.scale.setScalar(t)}),(0,t.jsx)("group",{children:u.APAC_MARKETS.map(r=>{let o=(0,s.latLngToVec3)(r.lat,r.lng,1.012),n=r.hub?d:c;return(0,t.jsxs)("group",{position:o,children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[r.hub?.027:.017,14,14]}),(0,t.jsx)("meshBasicMaterial",{color:n})]}),(0,t.jsx)("sprite",{ref:r.hub?i:void 0,scale:r.hub?.3:.17,children:(0,t.jsx)("spriteMaterial",{map:e,color:n,transparent:!0,opacity:r.hub?.9:.62,blending:l.AdditiveBlending,depthWrite:!1})})]},r.code)})})}function x({tier:e}){let i=(0,r.useMemo)(()=>u.APAC_MARKETS.filter(e=>!e.hub).map(t=>({code:t.code,pts:(0,s.greatCircle)(m,t,1.01,"low"===e?28:56)})),[e]),n=(0,r.useMemo)(()=>i.map(e=>new l.CatmullRomCurve3(e.pts)),[i]),c=(0,r.useMemo)(v,[]),d=(0,r.useRef)(null);return(0,o.useFrame)(({clock:e})=>{if(!d.current)return;let t=e.elapsedTime;d.current.children.forEach((e,r)=>{let i=(.16*t+.137*r)%1,o=n[r].getPoint(i);e.position.copy(o);let a=Math.sin(i*Math.PI);e.scale.setScalar(.05+.045*a),e.material.opacity=.9*a})}),(0,t.jsxs)("group",{children:[i.map(r=>(0,t.jsx)(a.Line,{points:r.pts,color:"#38BDF8",lineWidth:"high"===e?1.1:.9,transparent:!0,opacity:.34,depthWrite:!1},r.code)),(0,t.jsx)("group",{ref:d,children:i.map(e=>(0,t.jsx)("sprite",{children:(0,t.jsx)("spriteMaterial",{map:c,color:"#8FE3FF",transparent:!0,blending:l.AdditiveBlending,depthWrite:!1})},`s-${e.code}`))})]})}function y({tier:e,reduced:i,pointer:n}){let a=(0,r.useRef)(null),l=(0,r.useMemo)(()=>-((m.lng+180)*Math.PI)/180-Math.PI/2,[]);return(0,o.useFrame)((e,t)=>{if(!a.current)return;let r=n.current;r&&(r.x+=(r.tx-r.x)*Math.min(1,2.6*t),r.y+=(r.ty-r.y)*Math.min(1,2.6*t)),i||(a.current.rotation.y+=.035*t);let o=r?.x??0,l=r?.y??0;a.current.rotation.x=.32+.1*l,a.current.position.x=.1*o}),(0,t.jsxs)("group",{ref:a,rotation:[.32,l,.12],children:[(0,t.jsx)(f,{}),(0,t.jsx)(p,{count:"high"===e?4200:"mid"===e?2600:1300}),(0,t.jsx)(h,{}),(0,t.jsx)(x,{tier:e}),(0,t.jsx)(g,{})]})}e.s(["default",0,function({tier:e,reduced:r,active:o,pointer:n}){return(0,t.jsx)(i.Canvas,{frameloop:o?"always":"demand",dpr:"high"===e?[1,2]:[1,1.5],gl:{antialias:"low"!==e,alpha:!0,powerPreference:"high-performance"},camera:{position:[0,0,3.25],fov:42},style:{background:"transparent"},children:(0,t.jsx)(y,{tier:e,reduced:r,pointer:n})})}])},13110,function(e){e.n(e.i(73331))}]);