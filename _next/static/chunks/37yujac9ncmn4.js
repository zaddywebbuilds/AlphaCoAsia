(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18626,e=>{"use strict";let t,i,r,n;var o=e.i(43476),s=e.i(71645),a=e.i(75056),l=e.i(94800),c=e.i(31067),d=e.i(90072),u=e.i(48546),f=d,p=d;let h=new p.Box3,m=new p.Vector3;class v extends p.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new p.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new p.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new p.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new p.InterleavedBufferAttribute(i,3,0)),this.setAttribute("instanceEnd",new p.InterleavedBufferAttribute(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let r=new p.InstancedInterleavedBuffer(i,2*t,1);return this.setAttribute("instanceColorStart",new p.InterleavedBufferAttribute(r,t,0)),this.setAttribute("instanceColorEnd",new p.InterleavedBufferAttribute(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new p.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new p.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),h.setFromBufferAttribute(t),this.boundingBox.union(h))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new p.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let n=0,o=e.count;n<o;n++)m.fromBufferAttribute(e,n),r=Math.max(r,i.distanceToSquared(m)),m.fromBufferAttribute(t,n),r=Math.max(r,i.distanceToSquared(m));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var y=d,x=e.i(8560);let g=parseInt(d.REVISION.replace(/\D+/g,""));class w extends y.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:y.UniformsUtils.clone(y.UniformsUtils.merge([x.UniformsLib.common,x.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new y.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${g>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let S=g>=125?"uv1":"uv2",b=new f.Vector4,E=new f.Vector3,M=new f.Vector3,A=new f.Vector4,_=new f.Vector4,z=new f.Vector4,P=new f.Vector3,L=new f.Matrix4,U=new f.Line3,B=new f.Vector3,C=new f.Box3,j=new f.Sphere,O=new f.Vector4;function T(e,t,r){return O.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),O.multiplyScalar(1/O.w),O.x=i/r.width,O.y=i/r.height,O.applyMatrix4(e.projectionMatrixInverse),O.multiplyScalar(1/O.w),Math.abs(Math.max(O.x,O.y))}class D extends f.Mesh{constructor(e=new v,t=new w({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,n=0,o=t.count;e<o;e++,n+=2)E.fromBufferAttribute(t,e),M.fromBufferAttribute(i,e),r[n]=0===n?0:r[n-1],r[n+1]=r[n]+E.distanceTo(M);let n=new f.InstancedInterleavedBuffer(r,2,1);return e.setAttribute("instanceDistanceStart",new f.InterleavedBufferAttribute(n,1,0)),e.setAttribute("instanceDistanceEnd",new f.InterleavedBufferAttribute(n,1,1)),this}raycast(e,r){let n,o,s=this.material.worldUnits,a=e.camera;null!==a||s||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let c=this.matrixWorld,d=this.geometry,u=this.material;if(i=u.linewidth+l,null===d.boundingSphere&&d.computeBoundingSphere(),j.copy(d.boundingSphere).applyMatrix4(c),s)n=.5*i;else{let e=Math.max(a.near,j.distanceToPoint(t.origin));n=T(a,e,u.resolution)}if(j.radius+=n,!1!==t.intersectsSphere(j)){if(null===d.boundingBox&&d.computeBoundingBox(),C.copy(d.boundingBox).applyMatrix4(c),s)o=.5*i;else{let e=Math.max(a.near,C.distanceToPoint(t.origin));o=T(a,e,u.resolution)}C.expandByScalar(o),!1!==t.intersectsBox(C)&&(s?function(e,r){let n=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,a=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count);for(let o=0;o<l;o++){U.start.fromBufferAttribute(s,o),U.end.fromBufferAttribute(a,o),U.applyMatrix4(n);let l=new f.Vector3,c=new f.Vector3;t.distanceSqToSegment(U.start,U.end,c,l),c.distanceTo(l)<.5*i&&r.push({point:c,pointOnLine:l,distance:t.origin.distanceTo(c),object:e,face:null,faceIndex:o,uv:null,[S]:null})}}(this,r):function(e,r,n){let o=r.projectionMatrix,s=e.material.resolution,a=e.matrixWorld,l=e.geometry,c=l.attributes.instanceStart,d=l.attributes.instanceEnd,u=Math.min(l.instanceCount,c.count),p=-r.near;t.at(1,z),z.w=1,z.applyMatrix4(r.matrixWorldInverse),z.applyMatrix4(o),z.multiplyScalar(1/z.w),z.x*=s.x/2,z.y*=s.y/2,z.z=0,P.copy(z),L.multiplyMatrices(r.matrixWorldInverse,a);for(let r=0;r<u;r++){if(A.fromBufferAttribute(c,r),_.fromBufferAttribute(d,r),A.w=1,_.w=1,A.applyMatrix4(L),_.applyMatrix4(L),A.z>p&&_.z>p)continue;if(A.z>p){let e=A.z-_.z,t=(A.z-p)/e;A.lerp(_,t)}else if(_.z>p){let e=_.z-A.z,t=(_.z-p)/e;_.lerp(A,t)}A.applyMatrix4(o),_.applyMatrix4(o),A.multiplyScalar(1/A.w),_.multiplyScalar(1/_.w),A.x*=s.x/2,A.y*=s.y/2,_.x*=s.x/2,_.y*=s.y/2,U.start.copy(A),U.start.z=0,U.end.copy(_),U.end.z=0;let l=U.closestPointToPointParameter(P,!0);U.at(l,B);let u=f.MathUtils.lerp(A.z,_.z,l),h=u>=-1&&u<=1,m=P.distanceTo(B)<.5*i;if(h&&m){U.start.fromBufferAttribute(c,r),U.end.fromBufferAttribute(d,r),U.start.applyMatrix4(a),U.end.applyMatrix4(a);let i=new f.Vector3,o=new f.Vector3;t.distanceSqToSegment(U.start,U.end,o,i),n.push({point:o,pointOnLine:i,distance:t.origin.distanceTo(o),object:e,face:null,faceIndex:r,uv:null,[S]:null})}}}(this,a,r))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(b),this.material.uniforms.resolution.value.set(b.z,b.w))}}class R extends v{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let r=0;r<t;r+=3)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,r=new Float32Array(2*i);if(3===t)for(let n=0;n<i;n+=t)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5];else for(let n=0;n<i;n+=t)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5],r[2*n+6]=e[n+6],r[2*n+7]=e[n+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class I extends D{constructor(e=new R,t=new w({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let W=s.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:r,lineWidth:n,segments:o,dashed:a,...l},f){var p,h;let m=(0,u.useThree)(e=>e.size),y=s.useMemo(()=>o?new D:new I,[o]),[x]=s.useState(()=>new w),g=(null==i||null==(p=i[0])?void 0:p.length)===4?4:3,S=s.useMemo(()=>{let r=o?new v:new R,n=e.map(e=>{let t=Array.isArray(e);return e instanceof d.Vector3||e instanceof d.Vector4?[e.x,e.y,e.z]:e instanceof d.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(r.setPositions(n.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof d.Color?e.toArray():e);r.setColors(e.flat(),g)}return r},[e,o,i,g]);return s.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),s.useLayoutEffect(()=>{a?x.defines.USE_DASH="":delete x.defines.USE_DASH,x.needsUpdate=!0},[a,x]),s.useEffect(()=>()=>{S.dispose(),x.dispose()},[S]),s.createElement("primitive",(0,c.default)({object:y,ref:f},l),s.createElement("primitive",{object:S,attach:"geometry"}),s.createElement("primitive",(0,c.default)({object:x,attach:"material",color:t,vertexColors:!!i,resolution:[m.width,m.height],linewidth:null!=(h=null!=r?r:n)?h:1,dashed:a,transparent:4===g},l)))});var V=e.i(88014);let F=new d.Vector3,H=new d.Vector3,N=new d.Vector3,G=new d.Vector2;function $(e,t,i){let r=F.setFromMatrixPosition(e.matrixWorld);r.project(t);let n=i.width/2,o=i.height/2;return[r.x*n+n,-(r.y*o)+o]}let k=e=>1e-10>Math.abs(e)?0:e;function q(e,t,i=""){let r="matrix3d(";for(let i=0;16!==i;i++)r+=k(t[i]*e.elements[i])+(15!==i?",":")");return i+r}let K=(r=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>q(e,r)),Y=(n=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>q(e,n(t),"translate(-50%,-50%)")),J=s.forwardRef(({children:e,eps:t=.001,style:i,className:r,prepend:n,center:o,fullscreen:a,portal:f,distanceFactor:p,sprite:h=!1,transform:m=!1,occlude:v,onOcclude:y,castShadow:x,receiveShadow:g,material:w,geometry:S,zIndexRange:b=[0x1000037,0],calculatePosition:E=$,as:M="div",wrapperClass:A,pointerEvents:_="auto",...z},P)=>{let{gl:L,camera:U,scene:B,size:C,raycaster:j,events:O,viewport:T}=(0,u.useThree)(),[D]=s.useState(()=>document.createElement(M)),R=s.useRef(null),I=s.useRef(null),W=s.useRef(0),q=s.useRef([0,0]),J=s.useRef(null),Q=s.useRef(null),X=(null==f?void 0:f.current)||O.connected||L.domElement.parentNode,Z=s.useRef(null),ee=s.useRef(!1),et=s.useMemo(()=>{var e;return v&&"blending"!==v||Array.isArray(v)&&v.length&&(e=v[0])&&"object"==typeof e&&"current"in e},[v]);s.useLayoutEffect(()=>{let e=L.domElement;v&&"blending"===v?(e.style.zIndex=`${Math.floor(b[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[v]),s.useLayoutEffect(()=>{if(I.current){let e=R.current=V.createRoot(D);if(B.updateMatrixWorld(),m)D.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=E(I.current,U,C);D.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return X&&(n?X.prepend(D):X.appendChild(D)),()=>{X&&X.removeChild(D),e.unmount()}}},[X,m]),s.useLayoutEffect(()=>{A&&(D.className=A)},[A]);let ei=s.useMemo(()=>m?{position:"absolute",top:0,left:0,width:C.width,height:C.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:o?"translate3d(-50%,-50%,0)":"none",...a&&{top:-C.height/2,left:-C.width/2,width:C.width,height:C.height},...i},[i,o,a,C,m]),er=s.useMemo(()=>({position:"absolute",pointerEvents:_}),[_]);s.useLayoutEffect(()=>{var t,n;ee.current=!1,m?null==(t=R.current)||t.render(s.createElement("div",{ref:J,style:ei},s.createElement("div",{ref:Q,style:er},s.createElement("div",{ref:P,className:r,style:i,children:e})))):null==(n=R.current)||n.render(s.createElement("div",{ref:P,style:ei,className:r,children:e}))});let en=s.useRef(!0);(0,l.useFrame)(e=>{if(I.current){U.updateMatrixWorld(),I.current.updateWorldMatrix(!0,!1);let e=m?q.current:E(I.current,U,C);if(m||Math.abs(W.current-U.zoom)>t||Math.abs(q.current[0]-e[0])>t||Math.abs(q.current[1]-e[1])>t){var i;let t,r,n,o,s=(i=I.current,t=F.setFromMatrixPosition(i.matrixWorld),r=H.setFromMatrixPosition(U.matrixWorld),n=t.sub(r),o=U.getWorldDirection(N),n.angleTo(o)>Math.PI/2),a=!1;et&&(Array.isArray(v)?a=v.map(e=>e.current):"blending"!==v&&(a=[B]));let l=en.current;a?en.current=function(e,t,i,r){let n=F.setFromMatrixPosition(e.matrixWorld),o=n.clone();o.project(t),G.set(o.x,o.y),i.setFromCamera(G,t);let s=i.intersectObjects(r,!0);if(s.length){let e=s[0].distance;return n.distanceTo(i.ray.origin)<e}return!0}(I.current,U,j,a)&&!s:en.current=!s,l!==en.current&&(y?y(!en.current):D.style.display=en.current?"block":"none");let c=Math.floor(b[0]/2),u=v?et?[b[0],c]:[c-1,0]:b;if(D.style.zIndex=`${function(e,t,i){if(t instanceof d.PerspectiveCamera||t instanceof d.OrthographicCamera){let r=F.setFromMatrixPosition(e.matrixWorld),n=H.setFromMatrixPosition(t.matrixWorld),o=r.distanceTo(n),s=(i[1]-i[0])/(t.far-t.near),a=i[1]-s*t.far;return Math.round(s*o+a)}}(I.current,U,u)}`,m){let[e,t]=[C.width/2,C.height/2],i=U.projectionMatrix.elements[5]*t,{isOrthographicCamera:r,top:n,left:o,bottom:s,right:a}=U,l=K(U.matrixWorldInverse),c=r?`scale(${i})translate(${k(-(a+o)/2)}px,${k((n+s)/2)}px)`:`translateZ(${i}px)`,d=I.current.matrixWorld;h&&((d=U.matrixWorldInverse.clone().transpose().copyPosition(d).scale(I.current.scale)).elements[3]=d.elements[7]=d.elements[11]=0,d.elements[15]=1),D.style.width=C.width+"px",D.style.height=C.height+"px",D.style.perspective=r?"":`${i}px`,J.current&&Q.current&&(J.current.style.transform=`${c}${l}translate(${e}px,${t}px)`,Q.current.style.transform=Y(d,1/((p||10)/400)))}else{let t=void 0===p?1:function(e,t){if(t instanceof d.OrthographicCamera)return t.zoom;if(!(t instanceof d.PerspectiveCamera))return 1;{let i=F.setFromMatrixPosition(e.matrixWorld),r=H.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*i.distanceTo(r))}}(I.current,U)*p;D.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}q.current=e,W.current=U.zoom}}if(!et&&Z.current&&!ee.current)if(m){if(J.current){let e=J.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=U;if(t||S)z.scale&&(Array.isArray(z.scale)?z.scale instanceof d.Vector3?Z.current.scale.copy(z.scale.clone().divideScalar(1)):Z.current.scale.set(1/z.scale[0],1/z.scale[1],1/z.scale[2]):Z.current.scale.setScalar(1/z.scale));else{let t=(p||10)/400,i=e.clientWidth*t,r=e.clientHeight*t;Z.current.scale.set(i,r,1)}ee.current=!0}}}else{let t=D.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/T.factor,i=t.clientWidth*e,r=t.clientHeight*e;Z.current.scale.set(i,r,1),ee.current=!0}Z.current.lookAt(e.camera.position)}});let eo=s.useMemo(()=>({vertexShader:m?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[m]);return s.createElement("group",(0,c.default)({},z,{ref:I}),v&&!et&&s.createElement("mesh",{castShadow:x,receiveShadow:g,ref:Z},S||s.createElement("planeGeometry",null),w||s.createElement("shaderMaterial",{side:d.DoubleSide,vertexShader:eo.vertexShader,fragmentShader:eo.fragmentShader})))});var Q=e.i(16148),X=e.i(46229);let Z="#38BDF8",ee="#C9A040",et=Q.APAC_MARKETS.map(e=>{var t,i;let r;return{...e,pos:(t=e.lat,i=e.lng,r=(0,X.projectAPAC)(t,i),new d.Vector3(2.15*r.x,0,-(1.55*r.y))),h:e.hub?.34:.2}}),ei=et.find(e=>e.hub);function er(){let e=(0,s.useMemo)(()=>{let e=[],t=[],i=new d.Color(Z),r=(r,n)=>{for(let o of[r,n]){e.push(o.x,o.y,o.z);let r=.5*Math.pow(1-Math.min(1,Math.hypot(o.x/2.15,o.z/1.55)/1.25),1.7);t.push(i.r*r,i.g*r,i.b*r)}};for(let e=0;e<=26;e++){let t=-2.15+e/26*4.3;r(new d.Vector3(t,0,-1.55),new d.Vector3(t,0,1.55))}for(let e=0;e<=20;e++){let t=-1.55+e/20*3.1;r(new d.Vector3(-2.15,0,t),new d.Vector3(2.15,0,t))}let n=new d.BufferGeometry;return n.setAttribute("position",new d.Float32BufferAttribute(e,3)),n.setAttribute("color",new d.Float32BufferAttribute(t,3)),n},[]);return(0,o.jsx)("lineSegments",{geometry:e,frustumCulled:!1,children:(0,o.jsx)("lineBasicMaterial",{vertexColors:!0,transparent:!0,opacity:.6,depthWrite:!1})})}function en(){return(0,o.jsx)("group",{position:[ei.pos.x,.001,ei.pos.z],children:[.45,.85,1.3,1.8].map((e,t)=>(0,o.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],children:[(0,o.jsx)("ringGeometry",{args:[e,e+.004,96]}),(0,o.jsx)("meshBasicMaterial",{color:ee,transparent:!0,opacity:.16-.03*t,side:d.DoubleSide,depthWrite:!1})]},e))})}function eo({active:e,tier:t}){let i=(0,s.useMemo)(()=>et.filter(e=>!e.hub).map(e=>{let i=ei.pos.clone().setY(ei.h),r=e.pos.clone().setY(e.h),n=i.clone().lerp(r,.5);n.y+=.28+.14*i.distanceTo(r);let o=new d.QuadraticBezierCurve3(i,n,r);return{code:e.code,curve:o,pts:o.getPoints("low"===t?20:40)}}),[t]),r=(0,s.useRef)(null),n=i.find(t=>t.code===e);return(0,l.useFrame)(({clock:e})=>{if(!r.current||!n)return;let t=.3*e.elapsedTime%1;r.current.position.copy(n.curve.getPoint(t));let i=.018+.016*Math.sin(t*Math.PI);r.current.scale.setScalar(i/.018)}),(0,o.jsxs)("group",{children:[i.map(t=>{let i=t.code===e;return(0,o.jsx)(W,{points:t.pts,color:i?ee:Z,lineWidth:i?1.8:.9,transparent:!0,opacity:i?.95:.26,depthWrite:!1},t.code)}),n&&(0,o.jsxs)("mesh",{ref:r,children:[(0,o.jsx)("sphereGeometry",{args:[.018,10,10]}),(0,o.jsx)("meshBasicMaterial",{color:"#FFE6A8"})]})]})}function es({active:e,onSelect:t}){let i=(0,s.useRef)(null),r=et.find(t=>t.code===e)??ei;return(0,l.useFrame)(({clock:e})=>{if(!i.current)return;let t=.7*e.elapsedTime%1;i.current.scale.setScalar(.6+1.5*t),i.current.material.opacity=(1-t)*.5}),(0,o.jsxs)("group",{children:[(0,o.jsxs)("mesh",{ref:i,position:[r.pos.x,.004,r.pos.z],rotation:[-Math.PI/2,0,0],children:[(0,o.jsx)("ringGeometry",{args:[.075,.088,48]}),(0,o.jsx)("meshBasicMaterial",{color:ee,transparent:!0,side:d.DoubleSide,depthWrite:!1})]}),et.map(i=>{let r=i.code===e,n=i.hub||r?ee:Z;return(0,o.jsxs)("group",{position:i.pos,children:[(0,o.jsxs)("mesh",{position:[0,i.h/2,0],children:[(0,o.jsx)("cylinderGeometry",{args:[.0035,.0035,i.h,6]}),(0,o.jsx)("meshBasicMaterial",{color:n,transparent:!0,opacity:r?.85:.4})]}),(0,o.jsxs)("mesh",{position:[0,.002,0],rotation:[-Math.PI/2,0,0],children:[(0,o.jsx)("circleGeometry",{args:[r?.042:.028,24]}),(0,o.jsx)("meshBasicMaterial",{color:n,transparent:!0,opacity:.28,depthWrite:!1})]}),(0,o.jsxs)("mesh",{position:[0,i.h,0],onClick:e=>{e.stopPropagation(),t(i.code)},onPointerOver:e=>{e.stopPropagation(),document.body.style.cursor="pointer"},onPointerOut:()=>{document.body.style.cursor=""},children:[(0,o.jsx)("sphereGeometry",{args:[r?.036:.024,16,16]}),(0,o.jsx)("meshBasicMaterial",{color:n})]}),(0,o.jsx)(J,{position:[0,i.h+.1,0],center:!0,pointerEvents:"none",style:{pointerEvents:"none",userSelect:"none"},children:(0,o.jsx)("div",{className:"type-technical whitespace-nowrap transition-colors duration-300",style:{color:r?"#E0C780":"rgba(148,163,184,0.72)",fontSize:9},children:i.code})})]},i.code)})]})}function ea({active:e,reduced:t}){let i=et.find(t=>t.code===e)??ei,r=(0,s.useRef)(new d.Vector3(0,0,0)),n=(0,s.useRef)(new d.Vector3(0,0,0));return(0,l.useFrame)(({camera:e},o)=>{r.current.set(.3*i.pos.x,1.05,2.95+.16*i.pos.z),n.current.set(.34*i.pos.x,.5*i.h,.3*i.pos.z);let s=t?1:Math.min(1,2.2*o);e.position.lerp(r.current,s),e.lookAt(n.current)}),null}e.s(["default",0,function({active:e,onSelect:t,tier:i,reduced:r,running:n}){return(0,o.jsxs)(a.Canvas,{frameloop:n?"always":"demand",dpr:"high"===i?[1,2]:[1,1.5],gl:{antialias:"low"!==i,alpha:!0,powerPreference:"high-performance"},camera:{position:[0,1.05,2.95],fov:40},style:{background:"transparent"},children:[(0,o.jsxs)("group",{rotation:[0,-.12,0],children:[(0,o.jsx)(er,{}),(0,o.jsx)(en,{}),(0,o.jsx)(eo,{active:e,tier:i}),(0,o.jsx)(es,{active:e,onSelect:t})]}),(0,o.jsx)(ea,{active:e,reduced:r})]})}],18626)},33620,function(e){e.n(e.i(18626))}]);