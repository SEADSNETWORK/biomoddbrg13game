(this["webpackJsonpStudio.Subtiv.Builder.Front"]=this["webpackJsonpStudio.Subtiv.Builder.Front"]||[]).push([[0],{100:function(e,t,n){},197:function(e,t,n){},208:function(e,t,n){"use strict";n.r(t);var a,r,l,i,c,o=n(0),s=n.n(o),u=n(42),h=n.n(u),m=n(25),d=n(8),E=n(9),f=n(12),y=(n(100),n(1)),b=n(5),v=n(36),p=function(){function e(){Object(d.a)(this,e),this.colors={primary:"black",secondary:"white",tertiary:"red"},this.colors.text={primary:this.colors.secondary,secondary:this.colors.primary},this.defaultWrapWidth=3,this.font="American Typewriter",this.sizes={normal:"1.2em",title:"2em",subtitle:"1.4em"},this.medias={em:{xs:0,sm:48,md:64,lg:75},px:{xs:0,sm:768,md:1024,lg:5625}},this.medias.query={onlySmall:"(max-width: ".concat(this.medias.px.sm,"px)"),largerthansm:"(min-width: ".concat(this.medias.px.sm+1,"px)"),mdandup:"(min-width: ".concat(this.medias.px.md,"px)"),smallerthanmd:"(max-width: ".concat(this.medias.px.md-1,"px)")},this.padding={xs:10,sm:15,md:20,lg:30}}return Object(E.a)(e,[{key:"defaultWrap",get:function(){return"solid ".concat(this.colors.primary," ").concat(this.defaultWrapWidth,"px")}},{key:"defaultFont",get:function(){return"font-family : ".concat(this.font,"; font-size: ").concat(this.sizes.normal,";")}},{key:"styled",get:function(){return f.b}},{key:"responsive",value:function(e,t,n){return"\n            ".concat(e,": ").concat(t.xs).concat(n,";\n\n            @media only screen and (min-width: ").concat(this.medias.px.sm,"px) {\n                ").concat(e,": ").concat(t.sm).concat(n,";\n            }\n\n            @media only screen and (min-width: ").concat(this.medias.px.md,"px) {\n                ").concat(e,": ").concat(t.md).concat(n,";\n            }        \n\n            @media only screen and (min-width: ").concat(this.medias.px.lg,"px) {\n                ").concat(e,": ").concat(t.lg).concat(n,";\n            }        \n        ")}},{key:"Wrapped",get:function(){var e=this;return function(t){var n=t.children;return s.a.createElement(g,{content:"border : ".concat(e.defaultWrap,"; background: white;")},n)}}},{key:"Container",get:function(){var e=this;return function(t){var n=t.children;return s.a.createElement(g,{content:e.responsive("padding",e.padding,"px")},n)}}},{key:"Empty",get:function(){return function(e){var t=e.children;return s.a.createElement(g,null,t)}}},{key:"Text",get:function(){var e=this;return function(t){var n=t.children;return s.a.createElement(O,{content:e.defaultFont},n)}}},{key:"Title",get:function(){return f.b.div(a||(a=Object(m.a)(["\n            ","\n            font-size: ","; \n            font-weight: bold;\n        "])),this.defaultFont,this.sizes.title)}},{key:"SubTitle",get:function(){return Object(f.b)(this.Title)(r||(r=Object(m.a)(["\n            font-size: ","; \n        "])),this.sizes.subtitle)}}]),e}(),g=(f.b.div(l||(l=Object(m.a)(["\n    border: ","\n"])),(function(e){return e.border})),f.b.div(i||(i=Object(m.a)(["\n    ","\n    \n"])),(function(e){return e.content}))),O=f.b.span(c||(c=Object(m.a)(["\n    ","\n"])),(function(e){return e.content})),x=p,S=n(6),j=n(34),k=n(90),T=n(3),C=Object.freeze({SET_CLIENT:Symbol("data/client"),SET_NAV_OPEN:Symbol("data/navopen"),SET_THEME:Symbol("data/theme"),SET_THEMES:Symbol("data/themes"),SET_NEWS:Symbol("data/news"),SET_EVENTS:Symbol("data/cal"),SET_FAQS:Symbol("data/faq"),SET_SENSOR_TYPES:Symbol("data/svt"),SET_PLANT_CLUSTERS:Symbol("data/pc"),SET_SOCKET:Symbol("socket"),SET_GAME_SETTINGS:Symbol("gamesettings")}),w={client:null,navopen:window.innerWidth>768,theme:null,themes:null,news:null,events:null,faqs:null,sensorTypes:null,plantClusters:null,socket:null,gameSettings:null},D=Object(j.b)({data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case C.SET_SELECTED:return Object(T.a)(Object(T.a)({},e),{},{selected:t.selected});case C.SET_CLIENT:return Object(T.a)(Object(T.a)({},e),{},{client:t.client});case C.SET_SENSOR_TYPES:return Object(T.a)(Object(T.a)({},e),{},{sensorTypes:t.sensorTypes});case C.SET_GAME_SETTINGS:return Object(T.a)(Object(T.a)({},e),{},{gameSettings:t.gameSettings});case C.SET_SOCKET:return Object(T.a)(Object(T.a)({},e),{},{socket:t.socket});case C.SET_PLANT_CLUSTERS:return Object(T.a)(Object(T.a)({},e),{},{plantClusters:t.plantClusters});case C.SET_NEWS:return Object(T.a)(Object(T.a)({},e),{},{news:t.news});case C.SET_EVENTS:return Object(T.a)(Object(T.a)({},e),{},{events:t.events});case C.SET_NAV_OPEN:return Object(T.a)(Object(T.a)({},e),{},{navopen:t.navopen});case C.SET_THEME:return Object(T.a)(Object(T.a)({},e),{},{theme:t.theme});case C.SET_THEMES:return Object(T.a)(Object(T.a)({},e),{},{themes:t.themes});default:return Object(T.a)({},e)}}}),N=Object(j.a)(k.a),_=Object(j.c)(D,N),P=n(11),M=(n(104),function(){var e="localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,t="Running ".concat(e?"local":"server");return e&&(document.title=" (local) "+document.title),{dev:e,status:t,printstatus:function(){console.log(t)}}}),I=n(91),L=n(31),R=function(e,t){M(),I.a;return t="localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?Object(L.io)("http://localhost:2200/",{transports:["websocket"]}):Object(L.io)(),e({type:C.SET_SOCKET,socket:t}),t.on("/gamesettings",(function(t){e({type:C.SET_GAME_SETTINGS,gameSettings:t})})),t.on("/sensortypes",(function(t){e({type:C.SET_SENSOR_TYPES,sensorTypes:t})})),{socket:t}};var V=n(24),G=n(92),z=n.n(G),A=function(){var e=Object(b.c)((function(e){return e.data.theme}));return e?s.a.createElement(v.c,{center:"xs"},s.a.createElement(v.a,{xs:8,sm:2},s.a.createElement(V.a,{to:"/"},s.a.createElement("img",{src:z.a,style:{width:"100%"}}))),s.a.createElement(v.a,{xs:12,sm:10},s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(V.a,{to:"/"},s.a.createElement(e.Text,null,s.a.createElement("span",{style:{color:"white",fontSize:"4em",fontWeight:"bold"}},"\xa0BIOMODD [BRG",s.a.createElement("sup",null,"13"),"]"))),s.a.createElement(e.Container,null,s.a.createElement(e.Text,null,s.a.createElement(V.a,{to:"/gamelegacy",style:{color:"white"}},"\xa0\xa0\xa0-> TEST GAME (legacy)"),s.a.createElement(V.a,{to:"/server",style:{color:"white"}},"\xa0\xa0\xa0-> TEST SERVER"),s.a.createElement(V.a,{to:"/",style:{color:"white"}},"\xa0\xa0\xa0-> HOME"))))):null},W=n(50),U=n.n(W),H=function(e,t,n,a,r){var l=2*Math.PI/a*r,i=e.createVector(Math.cos(l),Math.sin(l));return i.mult(n),i.add(t),i};function F(e){return e*e}function q(e,t){return F(e.x-t.x)+F(e.y-t.y)}var Y,B=function(e,t,n){return Math.sqrt(function(e,t,n){var a=q(t,n);if(0==a)return q(e,t);var r=((e.x-t.x)*(n.x-t.x)+(e.y-t.y)*(n.y-t.y))/a;return r=Math.max(0,Math.min(1,r)),q(e,{x:t.x+r*(n.x-t.x),y:t.y+r*(n.y-t.y)})}(e,t,n))},K=n(93),X=n(22),J=n(21),Q=Object.freeze({UNSELECTED:"unselected",CLICKED:"clicked",HOVERING:"hovering",DRAGGED:"dragged"}),Z=function(){function e(t,n){var a=this;Object(d.a)(this,e),this.easer=function(e,t){return t+=(e-t)*a.easing},this.checkChanged=function(){var e=a.changed;return a.changed=!1,e},this.location=t,this.size=n,this.state=Q.UNSELECTED,this.changed=!1,this.easing=.05}return Object(E.a)(e,[{key:"isOver",value:function(e){return e.dist(this.location)<this.size/2}},{key:"isCurrentOver",value:function(e){return this.isOver(e.createVector(e.mouseX,e.mouseY))}},{key:"mousePressed",value:function(e){this.isCurrentOver(e)&&(this.state=Q.CLICKED)}},{key:"mouseReleased",value:function(e){this.state=Q.UNSELECTED,this.mouseMoved(e),this.changed=!0}},{key:"mouseDragged",value:function(e){this.state!==Q.UNSELECTED&&(this.state=Q.DRAGGED),this.changed=!0}},{key:"mouseMoved",value:function(e){this.state===Q.UNSELECTED&&this.isCurrentOver(e)?this.state=Q.HOVERING:this.state!==Q.HOVERING||this.isCurrentOver(e)||(this.state=Q.UNSELECTED)}}]),e}(),$=function(e){Object(X.a)(n,e);var t=Object(J.a)(n);function n(e){var a,r=e.location,l=e.size,i=e.color,c=e.alternativeColor,o=e.onClick;return Object(d.a)(this,n),(a=t.call(this,r,l)).color=i,a.alternativeColor=c,a.collisionColor="red",a.colorplaceholder=i,a.onClick=o,a.currentColors={red:!1,green:!1,blue:!1},a}return Object(E.a)(n,[{key:"detectCollision",value:function(e){var t=!1;this.currenctColors={red:!1,green:!1,blue:!1};var n,a=Object(K.a)(e.values());try{for(a.s();!(n=a.n()).done;)for(var r=n.value,l=0;l<r.beam.segments.length;l++){var i=r.beam.segments[l],c={x:i.p1_x,y:i.p1_y},o={x:i.p2_x,y:i.p2_y},s={x:this.location.x,y:this.location.y};B(s,c,o)<this.size/2&&(t=!0,this.currentColors[r.color]=!0)}}catch(u){a.e(u)}finally{a.f()}this.color=t?this.collisionColor:this.colorplaceholder}},{key:"draw",value:function(e){e.noStroke(),this.state===Q.UNSELECTED||this.state===Q.HOVERING?e.fill(this.color):(this.state===Q.CLICKED&&this.onClick(),e.fill(this.alternativeColor));var t=this.size;this.state===Q.HOVERING&&(t+=5*Math.sin(e.millis())),e.circle(this.location.x,this.location.y,t)}}]),n}(Z),ee=n(26),te=n(13),ne=function(e){Object(X.a)(n,e);var t=Object(J.a)(n);function n(e,a,r,l,i,c){var o;return Object(d.a)(this,n),(o=t.call(this,e,a)).color=i,o.strokeWeight=c,o.direction=l,o.circleSize=r,o.target=o.direction,o}return Object(E.a)(n,[{key:"rotate",value:function(e){var t=function(e){return e.createVector(e.mouseX,e.mouseY)}(e),n=e.createVector(0,0).set(this.location).sub(t);this.direction=e.createVector(-n.normalize().x,-n.normalize().y),this.target=this.direction}},{key:"getDirection",value:function(e){return this.direction}},{key:"isOver",value:function(e){return e&&this.handlePosition&&e.dist(this.handlePosition)<this.size/2}},{key:"draw",value:function(e){this.state===Q.DRAGGED&&this.rotate(e),this.target!==this.direction&&(this.direction.x=this.easer(this.target.x,this.direction.x),this.direction.y=this.easer(this.target.y,this.direction.y)),e.strokeWeight(this.strokeWeight),e.noFill(),e.stroke(this.color),e.circle(this.location.x,this.location.y,this.circleSize);var t=e.createVector(this.direction.x,this.direction.y);t.setMag(this.circleSize/2),this.handlePosition=e.createVector(this.location.x,this.location.y).add(t),e.noStroke(),e.fill(this.color),e.circle(this.handlePosition.x,this.handlePosition.y,this.state===Q.UNSELECTED?this.size:1.2*this.size)}}]),n}(Z),ae=function e(t,n,a,r,l,i){Object(d.a)(this,e),this.p1_x=t,this.p1_y=n,this.p2_x=a,this.p2_y=r,this.color=l,this.mirror=i},re=function(){function e(t,n,a,r,l){Object(d.a)(this,e),this.origin=t,this.direction=n,this.color=a,this.segments=[],this.mirrors=r,this.intersectPoints=[]}return Object(E.a)(e,[{key:"setDirection",value:function(e,t){this.direction=e}},{key:"cast",value:function(e,t,n,a,r){var l=n.createVector(t).set(e);l.setMag(Math.sqrt(Math.pow(n.width,2)+Math.pow(n.height,2))),l.add(t);var i=this.reflect(t,l,e,n,r);if(!1!==i){this.segments.push(new ae(t.x,t.y,i.x,i.y,this.color,r));var c=n.createVector(i.x,i.y);++a<1e3&&this.cast(i.direction,c,n,a,i.mirror)}else this.segments.push(new ae(t.x,t.y,l.x,l.y,this.color,r))}},{key:"reflect",value:function(e,t,n,a,r){for(var l=[],i=0;i<this.mirrors.length;i++){var c=this.mirrors[i].getPoints(a)[0],o=this.mirrors[i].getPoints(a)[1],s=((o.x-c.x)*(e.y-c.y)-(o.y-c.y)*(e.x-c.x))/((o.y-c.y)*(t.x-e.x)-(o.x-c.x)*(t.y-e.y)),u=((t.x-e.x)*(e.y-c.y)-(t.y-e.y)*(e.x-c.x))/((o.y-c.y)*(t.x-e.x)-(o.x-c.x)*(t.y-e.y));if(s>=0&&s<=1&&u>=0&&u<=1){var h=e.x+s*(t.x-e.x),m=e.y+s*(t.y-e.y),d=a.dist(e.x,e.y,h,m);if(this.mirrors[i].ID!=r){var E=this.mirrors[i].getReflection(a);l.push({x:h,y:m,distance:d,mirror:this.mirrors[i].ID,direction:0,reflectionNormal:E})}}}if(0===l.length)return!1;var f={};if(1==l.length){if(0==l[0].distance)return console.log("no reflection except itself"),!1;f=l[0]}else l.sort((function(e,t){return e.distance>t.distance?1:-1})),f=0==l[0].distance?l[1]:l[0];var y=a.createVector(n.x,n.y),b=a.createVector(f.reflectionNormal.x,f.reflectionNormal.y);return y.reflect(b),f.direction=y,this.intersectPoints.push(f),f}},{key:"draw",value:function(e,t){this.segments=[],this.intersectPoints=[],this.cast(e.createVector(-t.x,-t.y),this.origin,e,0,null);if(this.intersectPoints.length>0)for(var n=0;n<this.intersectPoints.length;n++)e.circle(this.intersectPoints[n].x,this.intersectPoints[n].y,10);e.noFill();for(var a=0;a<this.segments.length;a++)e.stroke(this.segments[a].color),e.line(this.segments[a].p1_x,this.segments[a].p1_y,this.segments[a].p2_x,this.segments[a].p2_y)}}]),e}(),le=function(e){Object(X.a)(n,e);var t=Object(J.a)(n);function n(e,a,r){var l,i=e.color,c=e.size,o=e.location,s=e.controlOffset,u=e.hide,h=e.strokeWeight,m=e.player;Object(d.a)(this,n),(l=t.call(this,o,c)).color=i,l.controlOffset=s,l.strokeWeight=h,l.player=m,l.hide=u;var E=r.createVector(r.random(-1,1),r.random(-1,1));return l.handle=new ne(l.location,10,50,E,l.color,l.strokeWeight),l.beam=new re(l.location,r.createVector(-l.handle.getDirection(r).x,-l.handle.getDirection(r).y),i,a,r),l}return Object(E.a)(n,[{key:"iPlay",value:function(){return this.player==this.color}},{key:"draw",value:function(e){this.hide||(e.noStroke(),this.iPlay()&&e.fill(this.color),e.circle(this.location.x,this.location.y,this.size),e.noFill(),this.handle.draw(e),this.beam.draw(e,this.handle.getDirection(e)))}},{key:"mousePressed",value:function(e){this.iPlay()&&(Object(ee.a)(Object(te.a)(n.prototype),"mousePressed",this).call(this,e),this.handle.mousePressed(e))}},{key:"mouseReleased",value:function(e){this.iPlay()&&(Object(ee.a)(Object(te.a)(n.prototype),"mouseReleased",this).call(this,e),this.handle.mouseReleased(e))}},{key:"mouseDragged",value:function(e){this.iPlay()&&(Object(ee.a)(Object(te.a)(n.prototype),"mouseDragged",this).call(this,e),this.handle.mouseDragged(e))}},{key:"mouseMoved",value:function(e){this.iPlay()&&(Object(ee.a)(Object(te.a)(n.prototype),"mouseMoved",this).call(this,e),this.handle.mouseMoved(e))}}]),n}(Z),ie=function(e){Object(X.a)(n,e);var t=Object(J.a)(n);function n(e,a){var r,l=e.location,i=e.size,c=e.color,o=e.alternativeColor,s=(e.direction,e.ID),u=e.onClick,h=e.player;Object(d.a)(this,n),(r=t.call(this,l,i)).color=c,r.alternativeColor=o,r.rotation=0,r.strokeWeight=5,r.player=h,r.ID=s;var m=a.createVector(a.random(-1,1),a.random(-1,1));return r.handle=new ne(r.location,10,25,m,r.color,2),r.reflectionNormals=[null,null],r.onClick=u,r.tester=new Z(r.location,r.size/3),r}return Object(E.a)(n,[{key:"getPoints",value:function(e){var t=this.handle.getDirection(e).setMag(this.size/2),n=e.createVector(t.x,t.y).rotate(Math.PI/2),a=e.createVector(this.location.x,this.location.y);a.add(e.createVector(-n.x,-n.y));var r=e.createVector(this.location.x,this.location.y);return r.add(n),[{x:a.x,y:a.y},{x:r.x,y:r.y}]}},{key:"setNormalizedLocation",value:function(e,t,n){var a=e*n.width,r=t*n.height;this.tester.location=n.createVector(a,r)}},{key:"getReflection",value:function(e){return e.createVector(this.handle.direction.x,this.handle.direction.y)}},{key:"isOver",value:function(e){var t=e.x,n=e.y;return this.location.x<=t&&t<=this.location.x+this.strokeWeight&&this.location.y<=n&&n<=this.location.y+this.size}},{key:"draw",value:function(e){this.location.x=this.easer(this.tester.location.x,this.location.x),this.location.y=this.easer(this.tester.location.y,this.location.y),this.handle.location=this.location,e.strokeWeight(this.strokeWeight),e.stroke(this.color);this.size;this.state===Q.HOVERING&&Math.sin(e.millis()),this.state===Q.CLICKED&&this.onClick();var t=this.getPoints(e);e.line(t[0].x,t[0].y,t[1].x,t[1].y),this.handle.draw(e);this.tester.state==Q.DRAGGED&&(this.tester.location=e.createVector(e.mouseX,e.mouseY),this.location=e.createVector(e.mouseX,e.mouseY),this.handle.location=e.createVector(e.mouseX,e.mouseY),this.changed=!0),this.tester.state==Q.CLICKED&&this.onClick()}},{key:"rotate",value:function(e){this.handle.direction.rotate(e),this.changed=!0,this.handle.changed=!0}},{key:"iPlayer",value:function(){return this.player==this.color||this.player==this.color+"s"}},{key:"mousePressed",value:function(e){this.iPlayer()&&(this.handle.mousePressed(e),this.tester.mousePressed(e))}},{key:"mouseReleased",value:function(e){this.iPlayer()&&(this.handle.mouseReleased(e),this.changed=!0,this.tester.mouseReleased(e))}},{key:"mouseDragged",value:function(e){this.iPlayer&&(this.tester.mouseDragged(e),this.handle.mouseDragged(e))}},{key:"mouseMoved",value:function(e){this.iPlayer()&&(this.tester.mouseMoved(e),this.handle.mouseMoved(e))}}]),n}(Z),ce=function(e){var t=e.socket,n=e.player,a=e.players,r=(e.safeDistance,e.scoreUpdate),l=new Map,i=[],c=[],o=[],u=[],h="black",m={size:30,controlOffset:20,offset:.4,strokeWeight:2},d={amount:1,size:40,color:"white",alternativeColor:"lightgreen"},E={size:50,alternativeColor:"0f0"},f=function(e){return e.createVector(.5*e.width,.5*e.height)};return s.a.createElement(U.a,{setup:function(e,r){if(console.log("game started"),!r||!r.offsetWidth)throw"canvas not found";console.log(r.offsetWidth),e.createCanvas(r.offsetWidth,window.screen.height).parent(r),t.on("/gameUpdate",(function(r){var s=["red","green","blue"];i.length||r.plants.forEach((function(n,a,r){i[a]=new $(Object(T.a)({location:e.createVector(n.x*e.width,n.y*e.height),ID:n.ID,onClick:function(){t.emit("/selected",{type:"plant",index:a})}},d)),o.push(i[a]),u.push(i[a])})),c.length?c.forEach((function(t,n){if(t&&t.state==Q.UNSELECTED&&t.handle.state==Q.UNSELECTED&&r.mirrors[n]){var a=r.mirrors[n];t.handle.target=e.createVector(a.rx,a.ry),t.setNormalizedLocation(a.x,a.y,e)}})):(r.mirrors.forEach((function(a,r,l){c[r]=new ie(Object(T.a)({location:e.createVector(a.x*e.width,a.y*e.height),player:n,color:a.player,ID:a.ID||Math.random(),onClick:function(){t.emit("/selected",{type:"mirror",index:r})}},E),e);var i=e.createVector(a.rx,a.ry);c[r].handle.direction=i,c[r].handle.target=i,o.push(c[r]),u.push(c[r])})),s.forEach((function(t,r){l.set(t,new le(Object(T.a)({color:t,player:n,hide:!a[t],location:H(e,f(e),e.width*m.offset,3,r)},m),c,e)),o.push(l.get(t)),u.push(l.get(t))}))),l&&s.forEach((function(t){var n=l.get(t);n&&n.state==Q.UNSELECTED&&(n.handle.target=e.createVector(r[t].x,r[t].y))}))})),t.on("/rotateMirror",(function(e){var t=e.index,n=e.value;t&&n&&c[t].rotate(n)})),t.on("/moveMirror",(function(e){var t=e.index,n=e.value;t&&n&&(c[t].location.x+=n.x||0,c[t].location.y+=n.y||0)}))},draw:function(e){if(e.background(h),o.forEach((function(t){return t.draw(e)})),i.forEach((function(e){return e.detectCollision(l)})),["red","green","blue"].forEach((function(e){var n=l.get(e);n&&n.handle.checkChanged()&&t.emit("/updateLight",{color:e,rotation:{x:n.handle.target.x,y:n.handle.target.y}})})),c.forEach((function(n,a){(n&&n.handle.checkChanged()||n.checkChanged())&&t.emit("/updateMirror",{index:a,x:n.location.x/e.width,y:n.location.y/e.height,rx:n.handle.target.x,ry:n.handle.target.y})})),e.frameCount%r==0){var a=0;t.emit("/giveGameUpdate"),i&&i[0]&&t.emit("/lights",i.map((function(e,t){e.currentColors[n]&&a++;var r={red:e.currentColors.red,green:e.currentColors.green,blue:e.currentColors.blue};return e.currentColors={red:!1,green:!1,blue:!1},{index:t,colors:r}}))),t.emit("/score",{player:n,score:a})}},mousePressed:function(e){u.forEach((function(t){return t.mousePressed(e)}))},mouseReleased:function(e){u.forEach((function(t){return t.mouseReleased(e)}))},mouseDragged:function(e){u.forEach((function(t){return t.mouseDragged(e)}))},mouseMoved:function(e){u.forEach((function(t){return t.mouseMoved(e)}))}})},oe=n(53),se=function(e){var t=e.name,n=e.description,a=Object(o.useState)(!1),r=Object(y.a)(a,2),l=r[0],i=r[1];return s.a.createElement("div",null,l?s.a.createElement("br",null):null,s.a.createElement("span",null,"---\x3e\xa0"),s.a.createElement("span",{className:"hoverer",onClick:function(){i(!l)}},"[",t,"] ",l?s.a.createElement("span",null,"[X]"):null),s.a.createElement("br",null),l?s.a.createElement("div",{className:"indenter"},n,s.a.createElement("br",null),s.a.createElement("br",null)):null)},ue=function(){var e=Object(b.c)((function(e){return e.data.sensorTypes})),t=Object(o.useState)(!1),n=Object(y.a)(t,2),a=n[0],r=n[1];return e?s.a.createElement("div",null,s.a.createElement("span",null,"--\x3e ",s.a.createElement("span",{className:"hoverer",onClick:function(){r(!a)}},"  SENSORTYPES   ",a?s.a.createElement("span",null,"[X]"):null)),a?e.map((function(e){return s.a.createElement(se,{key:e.name,name:e.name,description:e.description})})):null):null},he=function(e){var t=e.type,n=e.value,a=Object(o.useState)([]),r=Object(y.a)(a,2);r[0],r[1];return Object(o.useEffect)((function(){})),s.a.createElement("div",{className:"indenter"},t," - ",n)},me=function(e){var t=e.name,n=e.sensors,a=e.init,r=Object(o.useState)(a),l=Object(y.a)(r,2),i=l[0],c=l[1];return s.a.createElement("div",null,i?s.a.createElement("br",null):null,s.a.createElement("span",null,"---\x3e\xa0"),s.a.createElement("span",{className:"hoverer",onClick:function(){c(!i)}},"[",t,"] ",i?s.a.createElement("span",null,"[X]"):null),s.a.createElement("br",null),i?s.a.createElement("div",{className:"indenter"},n.map((function(e,t){return s.a.createElement(he,{key:"sensor"+t,type:e.type,value:e.value})})),s.a.createElement("br",null),s.a.createElement("br",null)):null)},de=function(e){var t=Object(o.useState)(!1),n=Object(y.a)(t,2),a=n[0],r=n[1];return Object(o.useEffect)((function(){})),e?s.a.createElement("div",null,s.a.createElement("span",null,"--\x3e ",s.a.createElement("span",{className:"hoverer",onClick:function(){r(!a)}},"  PLANTS   ",a?s.a.createElement("span",null,"[X]"):null)),a?e.plantClusters.map((function(e){return s.a.createElement(me,{key:e.name,name:e.name,sensors:e.sensors})})):null):null},Ee=function(e){var t=e.target,n=e.displaytext,a=e.endText,r=Object(o.useState)(null),l=Object(y.a)(r,2),i=l[0],c=l[1],u=Object(o.useState)(0),h=Object(y.a)(u,2),m=h[0],d=h[1];return Object(o.useEffect)((function(){var e=null;return t!==i&&(c(t),d(null)),i&&(e=setInterval((function(){d(i?Math.floor(Math.abs(((new Date).getTime()-i.getTime())/1e3)):null)}),500)),function(){e&&clearInterval(e)}})),t&&i&&m?m&&m>0?s.a.createElement("div",null,n,": ",m):s.a.createElement("div",null," ",a," "):null},fe=function(e){var t=e.phase,n=e.phases,a=e.target,r=e.player,l=Object(b.c)((function(e){return[e.data.theme,e.data.socket,e.data.client,e.data.gameSettings,e.data.sensorTypes]})),i=Object(y.a)(l,5),c=i[0],u=i[1],h=i[2],m=i[3],d=i[4],E=Object(o.useState)(null),f=Object(y.a)(E,2),v=f[0],p=f[1],g=Object(o.useState)(null),O=Object(y.a)(g,2),x=O[0],S=O[1],j=Object(o.useState)(null),k=Object(y.a)(j,2),T=k[0],C=k[1],w=Object(o.useState)(null),D=Object(y.a)(w,2),N=D[0],_=D[1];if(Object(o.useEffect)((function(){return u&&(u.on("/selected_",(function(e){S(e)})),u.on("/updateSensors",(function(e){p(e)})),u.on("/score_",(function(e){C(e)})),u.on("/highscore",(function(e){_(e),console.log(e)}))),function(){u.off("/selected_"),u.off("/updateSensors"),u.off("/score_"),u.off("/highscore")}})),!c||!h||!m||!u||!d||!v)return null;return s.a.createElement("div",null,s.a.createElement("br",null),s.a.createElement("p",null,"||==================================|| \xa0\xa0\xa0 BIOMODD [BRG",s.a.createElement("sup",null,"13"),"] SPECTRUM ||==================================||"),s.a.createElement("div",null,"GameStatus = ",t),function(){if(!x||!x.type)return null;switch(x.type){case"plant":return s.a.createElement("div",null," ",s.a.createElement("br",null),"-> Selection ",s.a.createElement("br",null),function(){var e=v[x.index];return s.a.createElement(me,{init:!0,key:e.name,name:e.name,sensors:e.sensors})}(),"--------------------- ",s.a.createElement("br",null),s.a.createElement("br",null));case"mirror":var e=function(e){return{index:x.index,value:e}};return s.a.createElement("div",null,"-> Mirror selected: [",x.index,"] ",s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("table",null,s.a.createElement("tbody",null,s.a.createElement("tr",null,s.a.createElement("td",{onClick:function(){u.emit("/rotateMirror_",e(3))}},"TURN LEFT"),s.a.createElement("td",{onClick:function(){u.emit("/rotateMirror_",e(-3))}},"TURN RIGHT")),s.a.createElement("tr",null,s.a.createElement("td",{onClick:function(){u.emit("/moveMirror_",e({y:-10}))}},"GO UP"),s.a.createElement("td",{onClick:function(){u.emit("/moveMirror_",e({y:10}))}},"GO DOWN")),s.a.createElement("tr",null,s.a.createElement("td",{onClick:function(){u.emit("/moveMirror_",e({x:-10}))}},"GO LEFT"),s.a.createElement("td",{onClick:function(){u.emit("/moveMirror_",e({x:10}))}},"GO RIGHT")))),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null));default:return"wrong selection"}}(),s.a.createElement("div",null,r?s.a.createElement("span",null,"PlayerColor = ",r," "):null),s.a.createElement("div",null,a&&t==n.RUNNING?s.a.createElement("span",null,s.a.createElement(Ee,{target:a,displaytext:"Time remaining",endText:"THE END"})," ",s.a.createElement("br",null)):null),s.a.createElement("br",null),s.a.createElement("div",null,T?s.a.createElement("div",null,"-- SCORE ",s.a.createElement("br",null),"RED: ",T.red," ",s.a.createElement("br",null),"GREEN: ",T.green," ",s.a.createElement("br",null),"BLUE: ",T.blue," ",s.a.createElement("br",null),"TOTAL: ",T.red+T.green+T.blue):null,N?s.a.createElement("div",null,"HIGHSCORE_INDIVIDUAL: ",N.HS1," ",s.a.createElement("br",null),"HIGHSCORE_TOTAL: ",N.HSA," ",s.a.createElement("br",null)):null),s.a.createElement(ue,null),s.a.createElement(de,{plantClusters:v}))},ye=function(e){e.socket;return"i will be score"},be=function(e){var t=e.player,n=e.players,a=e.socket,r=e.setPlayer,l=e.target,i=function(e){var l=s.a.createElement("div",{className:"kill"},"[PLAY ",e.toUpperCase(),"]"),i=s.a.createElement("div",null,"[",e.toUpperCase()," SELECTED]");return t?t==e||t==e+"s"?i:l:n[e]&&n[e+"s"]?l:n[e]?s.a.createElement("div",{className:"hoverer",onClick:function(){t||(a.emit("/startgame",e+"s"),r(e+"s"))}},"[PLAY ",e.toUpperCase()," support]"):s.a.createElement("div",{className:"hoverer",onClick:function(){t||(a.emit("/startgame",e),r(e))}},"[PLAY ",e.toUpperCase(),"]")};return s.a.createElement("div",{style:{color:"white"}},s.a.createElement("div",{style:{color:"white",width:"100%",textAlign:"center"}},s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null),"|| ==== LOAD NEW GAME ==== ||",s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("div",null,i("red"),i("green"),i("blue")),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(Ee,{target:l,displaytext:"Time before launch",endText:"LETS GO"})))},ve=function(){var e=Object.freeze({LOAD:"load",RUNNING:"running",END:"ended"}),t=Object(b.c)((function(e){return[e.data.theme,e.data.socket,e.data.client,e.data.gameSettings,e.data.plantClusters,e.data.sensorTypes]})),n=Object(y.a)(t,6),a=n[0],r=n[1],l=n[2],i=n[3],c=(n[4],n[5],Object(o.useState)(null)),u=Object(y.a)(c,2),h=u[0],m=u[1],d=Object(o.useState)(e.END),E=Object(y.a)(d,2),f=E[0],p=E[1],g=Object(o.useState)(null),O=Object(y.a)(g,2),x=O[0],S=O[1],j=Object(o.useState)(null),k=Object(y.a)(j,2),T=k[0],C=k[1],w=Object(o.useState)(null),D=Object(y.a)(w,2),N=D[0],_=D[1],P=Object(o.useState)(null),M=Object(y.a)(P,2),I=M[0],L=M[1],R=(Object(b.b)(),Object(oe.b)()),V=function(e){var t=new Date;t.setSeconds(t.getSeconds()+e),_(t)};Object(o.useEffect)((function(){return r&&(L(!0),r.on("/phase",(function(t){switch(p(t),t){case e.END:C(null),_(null);break;case e.LOAD:i&&V(i.beginningTime);break;case e.RUNNING:i&&V(i.duration)}})),x||r.emit("/givePlayers"),r.on("/players",(function(e){S(e)}))),function(){r&&(r.off("/phase"),r.off("/players"),L(!1))}}),[I,L,r,i]);var G=function(){switch(f){case e.LOAD:case e.END:return s.a.createElement(be,{player:T,players:x,socket:r,setPlayer:C,target:N});case e.RUNNING:return s.a.createElement(ce,{socket:r,player:T,players:x,scoreUpdate:i.scoreUpdate})}};return a&&l&&i&&x?s.a.createElement("div",null,h?null:s.a.createElement("button",{onClick:function(){m(!0),R.enter()}},"LOAD"),s.a.createElement(oe.a,{handle:R},s.a.createElement(v.c,null,s.a.createElement(v.a,{xs:12,sm:12,md:9},s.a.createElement(a.Empty,{style:{padding:"0",margin:"0"}},s.a.createElement("div",{style:{width:"100%",height:"100vh"}},i?G():null),s.a.createElement("div",null,s.a.createElement(ye,{socket:r})))),s.a.createElement(v.a,{xs:12,md:3,style:{background:"black",color:"white",borderLeft:"solid 2px white"}},s.a.createElement(fe,{phase:f,phases:e,target:N,player:T}))))):null},pe=(n(197),function(e){Object(X.a)(n,e);var t=Object(J.a)(n);function n(){var e;return Object(d.a)(this,n),(e=t.call(this)).font="Fira Code",e.sizes.normal="1.2em",e}return Object(E.a)(n,[{key:"defaultFont",get:function(){return"".concat(Object(ee.a)(Object(te.a)(n.prototype),"defaultFont",this),"font-weight: 400;")}},{key:"Title",get:function(){return this.styled(Object(ee.a)(Object(te.a)(n.prototype),"Title",this))(Y||(Y=Object(m.a)([" font-weight: bold;"])))}}]),n}(x)),ge=n(35),Oe=n.n(ge),xe=n(94),Se=n.n(xe),je=function(){var e=Object(b.c)((function(e){return e.data.theme})),t=Object(b.c)((function(e){return e.data.news})),n=Object(b.c)((function(e){return e.data.events})),a=Object(b.c)((function(e){return e.data.faqs})),r=Object(o.useRef)(null);if(e){var l=function(t){return t.map((function(t){var n=t.title,a=t.description,r=t.available,l=t.moment;return s.a.createElement("div",{key:n},s.a.createElement(e.SubTitle,null,s.a.createElement(Se.a,{format:"DD/MM"},l)," \xa0\xa0 ",n),s.a.createElement(e.Text,null,s.a.createElement(Oe.a,{blocks:a})),s.a.createElement(e.Text,null,s.a.createElement("i",null,"Available places: ",r)),s.a.createElement("br",null),"                  ",s.a.createElement("br",null),"                  ",s.a.createElement("br",null))}))};return s.a.createElement(v.c,{align:"center"},s.a.createElement(v.a,{xs:12},s.a.createElement(A,null)),s.a.createElement(v.a,{xs:12,sm:8,md:6},s.a.createElement(e.Container,null,s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(e.Wrapped,null,s.a.createElement(e.Container,null,s.a.createElement(e.Title,{ref:r},"NEWS"),s.a.createElement("br",null),t?t.map((function(t){var n=t.title,a=t.description,r=t.images;return s.a.createElement(s.a.Fragment,null,s.a.createElement(e.SubTitle,{key:n},n),s.a.createElement(e.Text,null,s.a.createElement(Oe.a,{blocks:a})),r&&r.length?r.map((function(t){var n=t.title,a=t.description,r=t.image;return s.a.createElement(s.a.Fragment,null,s.a.createElement(e.Text,{key:n},s.a.createElement("b",null,n)),s.a.createElement("img",{src:r,alt:n,style:{width:"100%"}}),s.a.createElement(e.Text,null,s.a.createElement("i",null,s.a.createElement(Oe.a,{blocks:a}))))})):null,s.a.createElement("br",null))})):s.a.createElement(e.Text,null,"L O A D I N G"))))),s.a.createElement(v.a,{xs:12,sm:8,md:6},s.a.createElement(e.Container,null,s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(e.Wrapped,null,s.a.createElement(e.Container,null,s.a.createElement(e.Title,null,"Frequently Asked Questions"),s.a.createElement("br",null),a?a.map((function(t){var n=t.title,a=t.description;return s.a.createElement(e.Text,{key:n},s.a.createElement("b",null,n)," ",s.a.createElement("br",null),s.a.createElement(Oe.a,{blocks:a}))})):s.a.createElement(e.Text,null,"L O A D I N G"),s.a.createElement("br",null)))),s.a.createElement(e.Container,null,s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(e.Wrapped,null,s.a.createElement(e.Container,null,s.a.createElement(e.Title,null,"EVENTS"),s.a.createElement("br",null),n?l(n.filter((function(e){var t=new Date,n=new Date(t);return n.setDate(n.getDate()-1),new Date(e.moment)>=n}))):s.a.createElement(e.Text,null,"L O A D I N G"),s.a.createElement("br",null),s.a.createElement(e.Title,null,"PAST EVENTS"),s.a.createElement("br",null),n?l(n.filter((function(e){var t=new Date,n=new Date(t);return n.setDate(n.getDate()-1),new Date(e.moment)<n}))):null)))))}return null},ke=function(){var e=Object(b.c)((function(e){return e.data})),t=Object(b.b)();return Object(o.useEffect)((function(){if(!e.client&&t){var n=R(t);t({type:C.SET_CLIENT,client:n})}if(!e.theme&&t){new pe;t({type:C.SET_THEME,theme:new pe})}})),null},Te=function(){var e=Object(P.a)();new pe;return s.a.createElement(b.a,{store:_},s.a.createElement(ke,null),s.a.createElement(S.b,{history:e},s.a.createElement(v.b,{style:{width:"100%",minWidth:"100%",margin:0,padding:0}},s.a.createElement("span",null,s.a.createElement(S.c,null,s.a.createElement(S.a,{exact:!0,path:"/",component:ve}),s.a.createElement(S.a,{exact:!0,path:"/gamelegacy",component:ve}),s.a.createElement(S.a,{component:je}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));h.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(Te,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},91:function(e){e.exports=JSON.parse('{"a":{"forceConnection":"false","projectId":"t39t9igo","dataset":"production","token":"skuqgSCQC4s2pxEmtmqYlPUtommpeqGIyRf9gvUOTmCygpeWClzMKSGOrnKIP7AFuepInhnK1DaZr6VykFyqHaKi01OgyTaI2FiVc75TqmLJoLJ0mRhUnXqqBIc8yNkvzqTJaBDeDHeLixGUPWoIRF5ZZL6cSAz1OMogyyBVOW5rtg3awQxd"}}')},92:function(e,t,n){e.exports=n.p+"static/media/logo.4ef8c6e8.svg"},95:function(e,t,n){e.exports=n(208)}},[[95,1,2]]]);
//# sourceMappingURL=main.1a78b9fb.chunk.js.map