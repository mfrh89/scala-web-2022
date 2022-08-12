!function(t){"use strict";var i="jquery-plate";function n(n,o){this.config(o),this.$container=n,this.options.element?"string"==typeof this.options.element?this.$element=this.$container.find(this.options.element):this.$element=t(this.options.element):this.$element=n,this.originalTransform=this.$element.css("transform"),this.$container.on("mouseenter."+i,this.onMouseEnter.bind(this)).on("mouseleave."+i,this.onMouseLeave.bind(this)).on("mousemove."+i,this.onMouseMove.bind(this))}n.prototype.config=function(i){this.options=t.extend({inverse:!1,perspective:500,maxRotation:10,animationDuration:200},this.options,i)},n.prototype.destroy=function(){this.$element.css("transform",this.originalTransform),this.$container.off("."+i)},n.prototype.update=function(t,i,n){var o,e;if(t||0===t){var s=this.$container.outerHeight(),a=(i-s/2)/(s/2);o=this.round(this.options.maxRotation*-a)}else e=0;if(i||0===i){var r=this.$container.outerWidth(),h=(t-r/2)/(r/2);e=this.round(this.options.maxRotation*h)}else o=0;this.options.inverse&&(o*=-1,e*=-1),n?this.animate(o,e,n):this.animation&&this.animation.remaining?(this.animation.targetX=o,this.animation.targetY=e):this.transform(o,e)},n.prototype.reset=function(t){this.update(null,null,t)},n.prototype.transform=function(t,i){this.currentX=t,this.currentY=i,this.$element.css("transform",(this.originalTransform&&"none"!==this.originalTransform?this.originalTransform+" ":"")+"perspective("+this.options.perspective+"px) rotateX("+t+"deg) rotateY("+i+"deg)")},n.prototype.animate=function(t,i,n){if(n){this.animation=this.animation||{};var o=this.animation.remaining;this.animation.time=performance.now(),this.animation.remaining=n||null,this.animation.targetX=t,this.animation.targetY=i,o||requestAnimationFrame(this.onAnimationFrame.bind(this))}else this.transform(t,i)},n.prototype.round=function(t){return Math.round(1e3*t)/1e3},n.prototype.offsetCoords=function(t){var i=this.$container.offset();return{x:t.pageX-i.left,y:t.pageY-i.top}},n.prototype.onAnimationFrame=function(t){this.animation=this.animation||{};var i=t-(this.animation.time||0);this.animation.time=t;var n=this.animation.remaining||0,o=Math.min(i/n,1),e=this.currentX||0,s=this.currentY||0,a=this.animation.targetX||0,r=this.animation.targetY||0,h=this.round(e+(a-e)*o),m=this.round(s+(r-s)*o);this.transform(h,m);var u=n-i;this.animation.remaining=u>0?u:null,u>0&&requestAnimationFrame(this.onAnimationFrame.bind(this))},n.prototype.onMouseEnter=function(t){var i=this.offsetCoords(t);this.update(i.x,i.y,this.options.animationDuration)},n.prototype.onMouseLeave=function(t){this.reset(this.options.animationDuration)},n.prototype.onMouseMove=function(t){var i=this.offsetCoords(t);this.update(i.x,i.y)},t.fn.plate=function(o){return this.each((function(){var e=t(this),s=e.data(i);"remove"===o?(s.destroy(),e.data(i,null)):s?s.config(o):(s=new n(e,o),e.data(i,s),s.reset())}))}}(jQuery);