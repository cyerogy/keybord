(function () {
  layout = {};
  //国际键盘
  layout['international'] = {
    'name': "international",
    'keys': [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "?", "+", "-"],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", ",", "."],
      ["Caps","z", "x", "c", "v", "b", "n", "m", "&", "@","Enter"],
      ["Space"]
    ]
  };
  //数字键盘
  layout['number'] = {
    'name': "number",
    'keys': [
      ["7", "8", "9"],
      ["4", "5", "6"],
      ["1", "2", "3"],
      ["0", ".", "-"]
    ],
    'otherkeys':[
      ["+"],
      ["Enter"],
    ]
  };


  function softKeybordClass(type) {
    this.table = null;
    this.select_index = 0;
    this.type = type;
  }
  //title
  softKeybordClass.prototype.createCaption = function(){
    var caption = document.createElement("div");
    caption.id = this.type + "caption";
    caption.className = "caption";
    return caption;
  }

  // input text
  softKeybordClass.prototype.createInputText = function () {
    var keybordinputtext = document.createElement("input");
    keybordinputtext.type = "text";
    keybordinputtext.id = this.type + "keybordinputtext";
    keybordinputtext.className = "form-control";
    return keybordinputtext;
  }

  // close_button
  softKeybordClass.prototype.createCloseButton = function () {
    var self = this;
    var close_button = document.createElement("button");
    close_button.id = this.type + "close_button";
    close_button.innerHTML = "×";
    close_button.className = "btn btn-default btn-keybord-close";
    close_button.onclick = function () {
      document.getElementById(self.table.id).style.display = "none";
    }
    return close_button;
  }

  //delete_button
  softKeybordClass.prototype.createDeleteButton = function () {
    var self = this;
    var delete_button = document.createElement("button");
    delete_button.id = this.type + "delete_button";
    delete_button.innerHTML = "←";
    delete_button.className = "btn btn-default btn-keybord-operate";
    delete_button.onclick = function(){
      var origin_value = document.getElementById(self.type + "keybordinputtext").value;
      if (origin_value !== "") {
        var current_value = origin_value.substring(0, origin_value.length - 1);
        document.getElementById(self.type + "keybordinputtext").value = current_value;
      }
    }
    return delete_button;
  }

  //clear button
  softKeybordClass.prototype.createClearButton = function () {
    var self = this;
    var clear_button = document.createElement("button");
    clear_button.id = this.type + "clear_button";
    clear_button.innerHTML = "clear";
    clear_button.className = "btn btn-default btn-keybord-operate";
    clear_button.onclick = function () {
      document.getElementById(self.type + "keybordinputtext").value = "";
    }
    return clear_button;
  }

  //Enter button
  softKeybordClass.prototype.createEnterButton = function () {
    var self = this;
    var enter_button = document.createElement("button");
    enter_button.id = this.type + "_enter_button";
    enter_button.onclick = function () {
      var origin_value = document.getElementById(self.type + "keybordinputtext").value;
      document.getElementsByClassName("keyboard"+self.type+"Input")[self.select_index].value = origin_value;
      if (!jCommon.empty(document.getElementsByClassName("keyboard"+self.type+"Input")[self.select_index].getAttribute("onblur"))) {
        document.getElementsByClassName("keyboard"+self.type+"Input")[self.select_index].onblur();
      }
      document.getElementById(self.type + "close_button").click();
    }
    return enter_button;
  }

  //Space button 
  softKeybordClass.prototype.createSpaceButton = function () {
    var self = this;
    var space_button = document.createElement("button");
    space_button.id = this.type + "_space_button";
    space_button.innerHTML = "Space";
    space_button.onclick = function () {
      var origin_value = document.getElementById(self.type + "keybordinputtext").value;
      document.getElementById(self.type + "keybordinputtext").value = origin_value + " ";
    }
    return space_button;
  }

  //Caps button
  softKeybordClass.prototype.createCapsButton = function () {
    var caps_button = document.createElement("button");
    caps_button.id = this.type + "_Caps_button";
    caps_button.innerHTML = "Caps";
    caps_button.onclick = function (event) {
      var key_letters = document.getElementsByClassName("key-letters");
      if (jCommon.checkWordInString(event.target.className,"color-word")){
        //LowerCase
        for (var i = 0; i < key_letters.length; i++) {
          var letter = key_letters[i].innerHTML.toLowerCase();
          key_letters[i].innerHTML = letter;
          key_letters[i].id = letter;
        }
        event.target.className = jCommon.removeClass(event.target.className, "color-word");
      }else{
        //UpperCase
        for (var i = 0; i < key_letters.length; i++) {
          var letter = key_letters[i].innerHTML.toUpperCase();
          key_letters[i].innerHTML = letter;
          key_letters[i].id = letter;
        }
        event.target.className = jCommon.addClass(event.target.className, "color-word");
      }
    }
    return caps_button;
  }

  //key
  softKeybordClass.prototype.createKeyBoard = function(){
    var self = this;
    var tbodydiv = document.createElement("div");
    var normalkeys = document.createElement("div");
    if(this.type === "number"){
      normalkeys.className = "mykeybord-padding-left";
    }
    var leftlayout = layout[this.type]["keys"];
    for (var i in leftlayout) {
      var tr = document.createElement("div");
      tr.className = "form-inline line-"+i;
      for (var j = 0; j < leftlayout[i].length; j++) {
        if (leftlayout[i][j].length === 1){
          var number_button = document.createElement("button");
          number_button.id = leftlayout[i][j];
          number_button.innerHTML = leftlayout[i][j];
          if ((leftlayout[i][j].charCodeAt() >= 97 && leftlayout[i][j].charCodeAt() <= 122) || (leftlayout[i][j].charCodeAt() >= 65 && leftlayout[i][j].charCodeAt() <= 90)){
            number_button.className = "btn btn-default btn-keybord-number key-letters";
          }else{
            number_button.className = "btn btn-default btn-keybord-number";
          }
          tr.appendChild(number_button);
        }else{
          var specialkeys;
          if (leftlayout[i][j] === "Caps"){
            specialkeys = this.createCapsButton();
            specialkeys.className = "btn btn-default btn-keybord-number width-150";
          }
          if (leftlayout[i][j] === "Enter"){
            specialkeys = this.createEnterButton();
            specialkeys.className = "btn btn-default btn-keybord-number width-150 EnterButton";
          }
          if (leftlayout[i][j] === "Space"){
            specialkeys = this.createSpaceButton();
            specialkeys.className = "btn btn-default btn-keybord-number width-280";
          }
          tr.appendChild(specialkeys);
        }
      }
      normalkeys.appendChild(tr);
    }
    tbodydiv.appendChild(normalkeys);
    if (this.type === "number") {
      var otherkeys = document.createElement("div");
      otherkeys.className = "mykeybord-padding-right";
      var rightlayout = layout[this.type]["otherkeys"];
      for (var i in rightlayout) {
        tr = document.createElement("div");
        tr.className = "form-inline";
        for (var j = 0; j < rightlayout[i].length; j++) {
          if (rightlayout[i][j].length == 1){
            var number_button = document.createElement("button");
            number_button.id = rightlayout[i][j];
            number_button.innerHTML = rightlayout[i][j];
            number_button.className = "btn btn-default btn-keybord-number height-145";
            tr.appendChild(number_button);
          }else{
            var enter_button = this.createEnterButton();
            enter_button.className = "btn btn-default btn-keybord-number height-145 EnterButton";
            tr.appendChild(enter_button);
          }
        }
        otherkeys.appendChild(tr);
      }
      tbodydiv.appendChild(otherkeys);
    }
    tbodydiv.onclick = function(event){
      var origin_value = document.getElementById(self.type + "keybordinputtext").value;
      if (!event.target.id || event.target.id.length > 1){
        return false;
      }else{
        document.getElementById(self.type + "keybordinputtext").value = origin_value + event.target.innerHTML.replace(/&amp;/g, "&");
      }
    }
    return tbodydiv;
  }

  softKeybordClass.prototype.createSoftKeybord = function () {
    this.table = document.createElement("div");
    this.table.id = this.type+"mykeybord";
    this.table.style.display = "none";
    if(this.type === "number"){
      // title
      this.table.appendChild(this.createCaption());
      var thead = document.createElement('div');
      thead.className = "form-inline";
      // text
      thead.appendChild(this.createInputText());
      // close button
      thead.appendChild(this.createCloseButton());
      this.table.appendChild(thead);
      var tbody = document.createElement("div");
      var tr = document.createElement("div");
      tr.className = "form-inline";
      // delete button
      tr.appendChild(this.createDeleteButton());
      //clear button
      tr.appendChild(this.createClearButton());
      tbody.appendChild(tr);
      tbody.appendChild(this.createKeyBoard());
    }else{
      // title
      this.table.appendChild(this.createCaption());
      var thead = document.createElement('div');
      thead.className = "form-inline";
      // text
      thead.appendChild(this.createInputText());
      // delete button
      thead.appendChild(this.createDeleteButton());
      //clear button
      thead.appendChild(this.createClearButton());
      // close button
      thead.appendChild(this.createCloseButton());
      this.table.appendChild(thead);
      var tbody = document.createElement("div");
      tbody.appendChild(this.createKeyBoard());
    }
    this.table.onclick = function(event){
      event.stopPropagation();
    }
    this.table.appendChild(tbody);
    document.body.appendChild(this.table);
  }



  var inintSoftKeyboard = function () {
    var inputNumberElems = document.getElementsByClassName('keyboardnumberInput');
    var inputInternationalElems = document.getElementsByClassName('keyboardinternationalInput');
    if (inputNumberElems.length > 0 && jCommon.empty(document.getElementById("numbermykeybord"))) {
      var keyboardintance = new softKeybordClass("number");
      keyboardintance.createSoftKeybord();
      for (var i = 0; i < inputNumberElems.length; i++) {
        (function (i, keyboardintance) {
          inputNumberElems[i].onfocus = function (event) {
            if (!jCommon.empty(document.getElementById("internationalmykeybord"))) {
              document.getElementById("internationalmykeybord").style.display = "none";
            }
            document.getElementById("numbercaption").innerHTML = this.getAttribute("data-keyboard-title");
            keyboardintance.select_index = i;
            keyboardintance.table.style.display = "block";
            document.getElementById("numberkeybordinputtext").value = this.value;
            document.getElementById("numberkeybordinputtext").focus();
            event.stopPropagation()
          }
        })(i, keyboardintance)
      }
    }
    if (inputInternationalElems.length > 0 && jCommon.empty(document.getElementById("internationalmykeybord"))){
      var keyboardintance = new softKeybordClass("international");
      keyboardintance.createSoftKeybord();
      for (var i = 0; i < inputInternationalElems.length; i++) {
        (function (i, keyboardintance) {
          inputInternationalElems[i].onfocus = function (event) {
            if (!jCommon.empty(document.getElementById("numbermykeybord"))) {
              document.getElementById("numbermykeybord").style.display = "none";
            }
            document.getElementById("internationalcaption").innerHTML = this.getAttribute("data-keyboard-title");
            keyboardintance.select_index = i;
            keyboardintance.table.style.display = "block";
            document.getElementById("internationalkeybordinputtext").value = this.value;
            document.getElementById("internationalkeybordinputtext").focus();
            event.stopPropagation();
          }
        })(i, keyboardintance)
      }
    }
    document.body.addEventListener("click", function (event) {
      if (!jCommon.empty(document.getElementById("numbermykeybord")) && event.target.className.indexOf("keyboardnumberInput") === -1) {
        document.getElementById("numbermykeybord").style.display = "none";
      }
      if (!jCommon.empty(document.getElementById("internationalmykeybord")) && event.target.className.indexOf("keyboardinternationalInput") === -1) {
        document.getElementById("internationalmykeybord").style.display = "none";
      }
    })
  }
  window.inintSoftKeyboard = inintSoftKeyboard;
})()