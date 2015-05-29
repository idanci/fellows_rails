/*
Inex InputCalc
version 0.5

Based on ZenInput
https://zenmoney.ru/demos/demo2.html
http://habrahabr.ru/blogs/jquery/98266/
License: Unknown

Options:
  errorElement
  commentElement
  wrapperElement
  calculateElement
Method:
  .option(name[,value])  - get/set option
Events:
  .onReady: function(calc){}                 - Widget ready
  .onFocus: function(calc){}                 - Widget get focus
  .onBlur: function(calc, result){}          - Widget lost focus
  .onInput: function(calc, symbol){}         - Widget get input any symbol
  .onCalculate: function(calc, result){}     - Called after any calculations [+,-,*,/,(,)]
  .onEndCalculate: function(calc, result){}  - Called if no calculations symbols [+,-,*,/,(,)]
  .onError: function(calc, symbol){}         - Called if incorrect symbol input
  .onEnter: function(calc, result){}         - Enter key pressed (called before onBlur)
  .onEscape: function(calc, result){}        - Escape key pressed (called before onBlur)
*/

jQuery(function(){
  jQuery.widget("todos_app.calcInput", {
    options: {
      errorElement: false,        // Error element
      commentElement: false,      // Edit hints element
      wrapperElement: false,      // Wrapper element
      calculateElement: false,    // Result element

      sign: false,                // Show minus sign when input is negative
      backgroundColor: '#CEDEEA', // Background color
      triad: false,               // Triad support on/off
      triadSeparator: ' ',        // Triad separator symbol
      decimalSeparator: '.',      // Decimal separator
      commaAsDot: true,           // Replace comma with dot

      defaultEmpty: false,        // If INPUT is empty set placeholder
      defaultValue: '0.00',       // Placeholder if input contains errors or result is 0
      preventDefault: true        // Prevent default actions (do not submit form on Enter press)
    },

    _nchars:   new RegExp(/[\!\@\#\№\$\%\^\&\=\[\]\\\'\;\{\}\|\"\:<\>\?~\`\_A-ZА-Яa-zа-я]/),
    _aripm:    new RegExp(/[\+\-\*\/]/),
    _aripmSt:  new RegExp(/^[\+\-\*\/]/),
    _triadRE:  new RegExp(/(\d+)(\d{3})/),

    _create : function() {
      var self = this;
      self.errTimer = undefined;
      self.oldVal = 0;
      self.newVal = 0;
      self.size= { left:0, top:0 };
      self.absW = null;
      self.absH = null;
      self.absT = null;
      self.absL = null;
      self.toOldVal = false;
      self._triadReplaceRE = new RegExp(this.options.triadSeparator, 'g')

      try {
        this.absW = this.element.outerWidth(true);
        this.absH = this.element.outerHeight(true);
        this.absT = this.size.top - 4;
        if ( isNaN( this.size.left + parseInt(this.element.css('marginLeft'),10) - 4 ) ) {
          this.absL = 0;
        } else {
          this.absL = this.size.left + parseInt(this.element.css('marginLeft'),10) - 4;
        }

        // Create Wrapper if not exists
        if (!this.options.wrapperElement) {
          this.options.wrapperElement = jQuery('<div class="todos_app-calcinput-wrapper"></div>');
          jQuery(this.options.wrapperElement).append('<div class="todos_app-calcinput-equal">=</div>');
          jQuery(this.options.wrapperElement).css({
            position  : 'absolute',
            left      : this.absL,
            top       : this.absT,
            visibility: 'hidden',
            zIndex    : '0',
            background: this.options.backgroundColor,
            width     : this.absW,
            padding   : (this.absH + 6) + 'px 3px 3px 3px'
          });
          this.element.after(this.options.wrapperElement);
        }
        // Create Calculate if not exists
        if(!this.options.calculateElement){
          this.options.calculateElement = $('<span class="todos_app-calcinput-calculate"></span>')
            .css({fontWeight: 'bold'});

          $('.todos_app-calcinput-equal', this.options.wrapperElement)
            .css({padding: '3px 0px 3px 0px'})
            .append(this.options.calculateElement);
        }
        // Check for default value
        if (!this.options.defaultEmpty) {
          if (!this.element.is(':focus') && this.element.val() === '') {
            this.element.val(this.options.defaultValue);
          }
          // Format INPUT.value on startup
          if (this.element.val() != this.options.defaultValue) {
            this.element.val(this._format(this._prepareInput(this.element.val())));
          }
        }

        this._focus();
        this._blur();
        this._keypress();
        this._keyup();

        this._trigger("onReady", this);
      } catch (e) {
      }
    },

    // Remove spaces from input
    // Replace comma with dot
    _prepareInput: function() {
      var result = String(this.element.val()).replace(this._triadReplaceRE, '');
      if (this.options.commaAsDot) {
        return result.replace(/,/g, '.');
      }
      return result;
    },
    _format: function(cost, fixed){
      var num = '0';
      var numd = '';
      var fixedTest = '00';
      fixed = ( !fixed ) ? fixed = 2 : fixed;
      if ( fixed != 2 ) {
        fixedTest = '';
        for ( var i = 0; i < fixed; i++ ) {
          fixedTest += String('0');
        }
      }
      if( !isNaN( parseFloat(cost) ) ){
        num = parseFloat(Math.abs(cost)).toFixed(fixed).toString();
        numd = num.substr(num.indexOf('.') + 1, fixed).toString();
        num = parseInt(num, 10).toString();

        // Triad Support
        if (this.options.triad) {
          while (this._triadRE.test(num)){
            num = num.replace(this._triadRE, '$1' + this.options.triadSeparator + '$2');
          }
        }
        if( numd != fixedTest ){
          var lastZeros = /[0]*$/g;
          num += this.options.decimalSeparator + numd.replace(lastZeros,'');
        }
        if( cost < 0 ) {
          num = '−' + num;
        }
      }
      return num;
    },

    // Calculate
    _calculate: function(tStr) {
       try {
         /*jslint evil: true */
         this.newVal = parseFloat( eval( tStr ), 10 );
         /*jslint evil: false */
         this.newVal = isNaN( this.newVal )?( 0 ):( this.newVal );
         this.newVal = isFinite( this.newVal )?( this.newVal ):( 0 );
         jQuery(this.options.calculateElement).html( this._format( this.newVal ) );
       } catch(ex) {
         this.newVal = 0;
         jQuery(this.options.calculateElement).html( this.newVal );
       }
    },

    // Create not indicated elements
    _focus: function() {
      var self = this, e = this.element, o = this.options;
      e.focus(function(){
        // Initionalization
        self.oldVal = parseFloat( self._prepareInput(), 10 );
        if ( isNaN(self.oldVal) ) {
          self.oldVal = 0;
        }
        self.newVal = self.oldVal;
        self.size   = e.position();
        self.absT   = self.size.top - 4;
        var mL      = e.css('marginLeft');
        mL          = isNaN( parseInt(mL,10) )?( 0 ):( parseInt(mL,10) );
        self.absL   = self.size.left + mL - 6;
        self.absW   = e.outerWidth(true);
        self.absH   = e.outerHeight(true);
        jQuery(o.wrapperElement).css({
          left: self.absL + 'px',
          top: self.absT - 3 + 'px',
          width: self.absW + 'px',
          padding: self.absH + 6 + 'px 6px 2px 6px'
        });
        if (o.commentElement) {
          $(o.commentElement).css({'display': 'block'});
        }

        // Set empty if defaultValue
        if (!o.defaultEmpty && e.val() == o.defaultValue) {
          e.val('');
        }
        self._trigger("onFocus", self);
      });
    },

    _blur: function() {
      var self = this, e = this.element, o = this.options;
      e.blur(function(){
        if ( self.toOldVal ){
          self.newVal = self.oldVal;
        }
        self.toOldVal = false;
        if ( o.commentElement ) {
          $(o.commentElement).css({'display':'none'});
        }
        if ( o.errorElement ) {
          $(o.errorElement).css({'display':'none'});
        }
        jQuery(o.wrapperElement).css({'visibility': 'hidden'});
        e.css({'position':'static'});
        var sign;
        if ( o.sign ){
          sign = ( self.newVal < 0 )?( '-' ):( '' );
        } else {
          sign = '';
        }
        self.newVal = Math.abs(self.newVal);
        if( self.newVal !== 0 ){
          e.val( sign + self._format( self.newVal ) );
          self._trigger("onBlur", self, self._format( self.newVal ));
        } else {
          e.val( o.defaultValue );
          if (!o.defaultEmpty && jQuery.trim(e.val()) === '') {
            e.val(o.defaultValue);
          }
          self._trigger("onBlur", self, o.defaultValue);
        }
      });
    },

    _keypress: function() {
      var self = this, e = this.element, o = this.options;
      e.keypress(function(evt){
        var k, i;
        var tAllow = false;
        if (!evt.charCode){
          k = String.fromCharCode(evt.which);
          c = evt.which;
        } else {
          k = String.fromCharCode(evt.charCode);
          c = evt.charCode;
        }
        if ( c == 37 || c == 39 ){ return true; }
        if( !evt.ctrlKey ){
          var res = self._nchars.test(k);
          if ( res ){
            if(o.commentElement) {
              $(o.commentElement).css({'display':'none'});
            }
            if(o.errorElement) {
              $(o.errorElement).css({'display':'block'});
            }
            self._trigger("onError", self, evt.charCode);
            e.addClass('error');
            clearTimeout(self.errTimer);
            self.errTimer = setTimeout(function(){
              if( o.errorElement ) {
                $(o.errorElement).css({'display':'none'});
              }
              if( o.commentElement ) {
                $(o.commentElement).css({'display':'block'});
              }
              e.removeClass('error');
            }, 3000);
            return false;
          } else {
            if ( evt.keyCode == 13 ){
              setTimeout(function(){ self._trigger("onEnter", self, self.newVal);}, 100);
              if (o.preventDefault) {
                evt.preventDefault();
              }
              e.blur();
              e.focus();
            }
          }
        }
      });
    },

    _keyup: function() {
      var self = this, e = this.element, o = this.options;
      e.keyup(function(evt){
        self.newVal =  self._prepareInput();
        if ( evt.keyCode == 27 ){
          self.toOldVal = true;
          self._trigger("onEscape", self, self.oldVal);
          e.blur();
          e.focus();
          return;
        }
        var res = self._aripm.test(self.newVal);
        var tStr;
        if (res) {
          res = self._aripmSt.test(self.newVal);
          if (jQuery(o.wrapperElement).css('visibility') == 'hidden') {
            var topZIndex = self.topZIndex();
            e.css({'position':'relative', 'zIndex': topZIndex});
            jQuery(o.wrapperElement).css({'visibility': 'visible', 'zIndex': topZIndex - 1});
          }
          if (res){
            tStr = String( self.oldVal ) + String(self.newVal);
            self._calculate(tStr);
          } else {
            tStr = String(self.newVal);
            self._calculate(tStr);
          }
          self._trigger("onCalculate", self, self.newVal);
        } else {
          jQuery(o.wrapperElement).css({'visibility': 'hidden'});
          e.css({'position':'static'});
          if ( isNaN( parseFloat(self.newVal, 10) ) ){
            self.newVal = 0;
            jQuery(o.calculateElement).html( self.newVal );
          } else {
            jQuery(o.calculateElement).html( self._format( parseFloat(self.newVal, 10) ) );
          }
          self._trigger("onEndCalculate", self, self.newVal);
        }
        self._trigger("onInput", self, evt.keyCode);
      });
    },

    // Set value
    setValue: function(value) {
      this.oldVal = 0;
      this.toOldVal = false;
      this.newVal = value;
      this.element.blur();
    },

    // Get maximum z-index on document
    topZIndex: function(){
      var maxZ = Math.max.apply(null,$.map($('body > *'), function(e,n){
        if($(e).css('position')=='absolute' || $(e).css('position')=='relative') {
          return parseInt($(e).css('z-index'), 10) || 1;
        }
      }));
      if (maxZ < 1) {
        return 1;
      }
      return maxZ;
    }
  });
});

