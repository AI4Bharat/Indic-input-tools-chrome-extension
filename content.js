

var typingTimer,
  $textObj,
  $ = window.jQuery || $,
  suggestionSelected = !1,
  languageCode = "",
  doneTypingInterval = 200,
  dragging = !1,
  numSpaces = 0,
  restart = !0,
  subStrLength = 0,
  parentUuid = "0",
  uuid = Math.random().toString(36).substr(2, 9),
  logJsonArray = [],
  $suggestionSpan = createSuggestionSpan();

function createSuggestionSpan() {
  return $("<div>", {
    id: "suggestion",
    class: "custom-suggestion-box",
  }).css({
    position: "fixed",
    borderRadius: "8px",
    padding: "10px",
    top: "0px",
    left: "0px",
    width: "auto",
    fontSize: "16px",
    display: "none",
    flexDirection: "column",
    overflowX: "hidden",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: "20000",
    background: "#FFFFFF",
    color: "#333333",
    fontFamily: "Open Sans, sans-serif",
    border: "1px solid #CCCCCC",
    whiteSpace: "nowrap",
    overflowX: "hidden",
  });
}
var languageCode = "en";
const languageSelectorIcon = document.createElement("div");
(languageSelectorIcon.id = "languageSelectorIcon"),
  (languageSelectorIcon.innerHTML = `<span style="margin-right: 5px;">🆎</span>Select Language`),
  (languageSelectorIcon.style.cssText = `
  font-size: 19px;
  cursor: pointer;
  color: rgb(255, 240, 235);
  transition: color 0.3s ease;
  background: rgb(33, 33, 33);
  border: 4px solid rgb(151, 151, 151);
  padding: 10px 10px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: fixed;
   bottom: 26px;
    left: 23px;
  z-index: 10002;
  width: 200px;
`),
  document.body.appendChild(languageSelectorIcon);
const languageDrawer = document.createElement("div");
(languageDrawer.id = "languageDrawer"),
  (languageDrawer.style.cssText = `
  background: #212121;
  bottom: 46px
    left: 23px;
  border: 4px solid #979797;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
  padding: 5px;
  border-radius: 20px 0 0 0;
  border-bottom: 4px solid #E91E63;
  display: none;
  color: white;
  position: fixed;
     bottom: 111px;
  z-index: 10002;
  width: 200px;
  font-size: 18px;
      left: 23px;
`),
  document.body.appendChild(languageDrawer);
const languages = [
  {
    name: "Off",
    code: "off",
  },
  {
    name: "Assamese",
    code: "as",
  },
  {
    name: "Bangla",
    code: "bn",
  },
  {
    name: "Boro",
    code: "brx",
  },
  {
    name: "Gujarati",
    code: "gu",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Kannada",
    code: "kn",
  },
  {
    name: "Kashmiri",
    code: "ks",
  },
  {
    name: "Konkani Goan",
    code: "gom",
  },
  {
    name: "Maithili",
    code: "mai",
  },
  {
    name: "Malayalam",
    code: "ml",
  },
  {
    name: "Manipuri",
    code: "mni",
  },
  {
    name: "Marathi",
    code: "mr",
  },
  {
    name: "Nepali",
    code: "ne",
  },
  {
    name: "Oriya",
    code: "or",
  },
  {
    name: "Panjabi",
    code: "pa",
  },
  {
    name: "Sanskrit",
    code: "sa",
  },
  {
    name: "Sindhi",
    code: "sd",
  },
  {
    name: "Sinhala",
    code: "si",
  },
  {
    name: "Tamil",
    code: "ta",
  },
  {
    name: "Telugu",
    code: "te",
  },
  {
    name: "Urdu",
    code: "ur",
  },
];
let selectedLanguage = languages[0];

function toggleLanguageDrawer() {
  languageDrawer.style.display =
    "none" === languageDrawer.style.display ? "flex" : "none";
}
languages.forEach((e, n) => {
  let t = document.createElement("button");
  (t.textContent = e.name),
    (t.style.cssText = `
    padding: 10px;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    border-bottom: ${n === languages.length - 1 ? "none" : "1px solid #ccc"};
    transition: background-color 0.3s ease, color 0.3s ease;
  `),
    t.addEventListener("click", () => {
      (selectedLanguage = e),
        (languageSelectorIcon.innerHTML = `<span style="margin-right: 5px;">🆎</span>${e.name}`),
        (languageDrawer.style.display = "none"),
        (languageCode = selectedLanguage.code),
        localStorage.setItem("selectedLanguage", languageCode);
    }),
    t.addEventListener("mouseover", () => {
      (t.style.backgroundColor = "#000"), (t.style.color = "#fff");
    }),
    t.addEventListener("mouseout", () => {
      (t.style.backgroundColor = "transparent"), (t.style.color = "inherit");
    }),
    languageDrawer.appendChild(t);
}),
  languageSelectorIcon.addEventListener("click", toggleLanguageDrawer),
  document.addEventListener("click", (e) => {
    languageDrawer.contains(e.target) ||
      e.target === languageSelectorIcon ||
      (languageDrawer.style.display = "none");
  });
var savedLanguage = localStorage.getItem("selectedLanguage");
if (savedLanguage) {
  languageCode = savedLanguage;
  let e = languages.find((e) => e.code === savedLanguage);
  e &&
    ((selectedLanguage = e),
    (languageSelectorIcon.innerHTML = `<span style="margin-right: 5px;">🆎</span>${selectedLanguage.name}`));
}
const style = document.createElement("style");
(style.textContent = `
  #languageDrawer::-webkit-scrollbar {
    width: 8px;
    background-color: #212121;
  }
  #languageDrawer::-webkit-scrollbar-thumb {
    background-color: #979797;
    border-radius: 4px;
  }
  #languageDrawer::-webkit-scrollbar-thumb:hover {
    background-color: #fff;
  }
`),
  document.head.appendChild(style);
var $notepadButton = $("<button>", {
  id: "notepad-button",
  html: "\uD83D\uDCDD",
}).css({
  position: "fixed",
  bottom: "45px",
  right: "20px",
  width: "50px",
  height: "50px",
  fontSize: "24px",
  borderRadius: "50%",
  border: "2px solid white",
  background: "rgb(53 53 53)",
  color: "#FFFFFF",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  zIndex: "20000",
  cursor: "pointer",
});
$("body").append($notepadButton);
var $notepadTextBox = $("<textarea>", {
  id: "notepad-textbox",
  placeholder: "Type your notes here...",
}).css({
  position: "fixed",
  bottom: "119px",
  right: "20px",
  width: "300px",
  height: "200px",
  padding: "20px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "7px solid rgb(255 190 190)",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  zIndex: "20000",
  display: "none",
  fontFamily: "Open Sans, sans-serif",
  resize: "none",
  background: "#f9f9f9",
  lineHeight: "1.5",
  color: "#333333",
  backgroundImage: "linear-gradient(white 95%, rgba(255, 255, 255, 0.7))",
  backgroundSize: "100% 20px",
  backgroundPosition: "left top",
  backgroundRepeat: "repeat-y",
});
$("body").append($notepadTextBox),
  $notepadButton.on("click", function () {
    $notepadTextBox.toggle();
  }),
  $notepadTextBox.on("change", function () {
    localStorage.setItem("savedNotes", $notepadTextBox.val());
  }),
  $(document).ready(function () {
    var e = localStorage.getItem("savedNotes");
    e && $notepadTextBox.val(e);
  });
const toggleButton = document.createElement("button");

function toggleOptions() {
  let e = document.getElementById("languageSelectorIcon"),
    n = document.getElementById("languageDrawer"),
    t = document.getElementById("notepad-button"),
    o = document.getElementById("notepad-textbox");
  "none" !== e.style.display
    ? ((e.style.display = "none"),
      (n.style.display = "none"),
      (t.style.display = "none"),
      (o.style.display = "none"),
      (toggleButton.innerHTML = "<span>\uD83D\uDD27</span>"),
      (toggleButton.style.transform = "rotate(180deg)"))
    : ((e.style.display = "block"),
      (n.style.display = "flex"),
      (t.style.display = "block"),
      (toggleButton.innerHTML = "<span>❌</span>"),
      (toggleButton.style.transform = "rotate(0deg)"));
}

function applyStyles(e) {
  var n = $("<style>").attr("type", "text/css");
  n[0].styleSheet ? (n[0].styleSheet.cssText = e) : n.text(e),
    $("head").append(n);
}

function getCurrentWord(e) {
  if (e.is("[contenteditable]")) var n = e.text().split(/\s+/);
  else (e.is("input:text") || e.is("textarea")) && (n = e.val().split(/\s+/));
  return n[n.length - 1];
}
(toggleButton.id = "toggleOptionsButton"),
  (toggleButton.innerHTML = "<span>❌</span>"),
  (toggleButton.style.cssText = `
  position: fixed;
  top: 6px;
    right: 11px;
  padding: 10px;
  background-color: rgb(33 33 33);
  color: white;
  border: 4px solid rgb(233, 30, 99);
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 10003;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  width: 4rem;
  height: 4rem;
`),
  toggleButton.addEventListener("click", toggleOptions),
  document.body.appendChild(toggleButton);
var prevWord = "";

function isWordAtEnd(e, n) {
  let t = (e = e.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim()).split(" ");
  return t[t.length - 1] === n;
}

function insertSuggestion(e, n) {
  let t, o;

  if (e.is("textarea") || e.is("input:text")) {
    t = e[0].selectionStart;
    o = e.val();
  } else if (e.is("[contenteditable]")) {
    const sel = window.getSelection();
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      t = range.startOffset;
      o = e.text();
    }
  }

  function getWordAtCursor(el) {
    const text =
      el.is("textarea") || el.is("input:text") ? el.val() : el.text();
    const cursorPos = t;
    const left = text.slice(0, cursorPos).search(/[\S\u0900-\u097F]+$/); 
    const right = text.slice(cursorPos).search(/\s/);
    const end = right === -1 ? text.length : cursorPos + right;
    const start = left === -1 ? 0 : left;
    return {
      word: text.slice(start, end),
      start: start,
      end: end,
    };
  }

  const { word: s, start: startPos, end: endPos } = getWordAtCursor(e);

  const isWordAtEnd = (text, word) => text.slice(-word.length) === word;

  let i = false;
  const remainingText = o.substring(endPos);
  if (remainingText.search(/\s/) === -1 && isWordAtEnd(o, s)) {
    i = true;
  }

  const r = o.slice(0, startPos) + n + (i ? " " : "") + o.slice(endPos);

  if (e.is("[contenteditable]")) {
    e.text(r);
    setTimeout(() => {
      const range = document.createRange();
      const sel = window.getSelection();
      const node = e[0].firstChild;
      const g = startPos + n.length + (i ? 1 : 0);
      range.setStart(node, g);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }, 0);
  } else if (e.is("input:text") || e.is("textarea")) {
    e.val(r);
    const g = startPos + n.length + (i ? 1 : 0);
    setTimeout(() => {
      e[0].setSelectionRange(g, g);
    }, 0);
  }

  e.trigger("input");
}

function getWordAtCursor(e) {
  var n = e.val() || e.text(),
    t = e.is("[contenteditable]")
      ? window.getSelection().getRangeAt(0).startOffset
      : e[0].selectionStart,
    o = n.slice(0, t).search(/\S+$/),
    s = n.slice(t).search(/\s/);
  return s < 0 && (s = n.length), n.slice(o, t + s).trim();
}

function handleSuggestionSelectedLog(
  e = $(".suggestion-item.selected").text()
) {
  if (logJsonArray.length) {
    let n = logJsonArray[logJsonArray.length - 1],
      t = {
        keystrokes: n.keystrokes,
        results: n.results,
        opted: e,
        created_at: new Date().toISOString(),
        language: languageCode,
      };
    (logJsonArray = [...logJsonArray, t]), (numSpaces += 1);
  }
}




let debounceTimer; 

function handleInput(e) {
  clearTimeout(debounceTimer); 

  debounceTimer = setTimeout(function () {
    if (0 == numSpaces || restart) {
      let n;
      e.is("textarea") || e.is("input:text")
        ? (n = e.val())
        : e.is("[contenteditable]") && (n = e.text()),
        (subStrLength = n.length >= 4 ? n.length - 4 : 0);
    }
    if (numSpaces >= 5) {
      let t;
      e.is("textarea") || e.is("input:text")
        ? (t = e.val())
        : e.is("[contenteditable]") && (t = e.text());
      let o = {
        uuid: uuid,
        parent_uuid: parentUuid,
        word: t,
        source: "input-tools-extension",
        language: languageCode,
        steps: logJsonArray,
      };
      (logJsonArray = []),
        (parentUuid = uuid),
        (uuid = Math.random().toString(36).substr(2, 9)),
        (subStrLength = t.length - 2),
        (numSpaces = 0),
        (restart = !0),
        fetch(
          "",
          {
            method: "POST",
            body: JSON.stringify(o),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then(async (e) => {
            if (!e.ok) throw await e.json();
          })
          .catch((e) => {
            console.log("error", e);
          });
    }
    if (suggestionSelected) {
      clearTimeout(typingTimer),
        (suggestionSelected = !1),
        $suggestionSpan.hide().empty();
      return;
    }
    var s = getWordAtCursor(e);
    $suggestionSpan.is(":visible") || e.after($suggestionSpan),
      (typingTimer = setTimeout(function () {
        "" !== languageCode &&
        "Select Language" !== languageCode &&
        "" !== s.trim()
          ? fetchSuggestions(s)
          : $suggestionSpan.hide().empty();
      }, 100));
  },240);
  e.off("input");
  e[0].dispatchEvent(new Event("input", { bubbles: true }));
  e.on("input", function () {
    handleInput(e);
  });
}

const suggestionCache = {};

function fetchSuggestions(e) {
  const cacheKey = `${e}-${languageCode}`; // Include language code in the cache key
  if (suggestionCache[cacheKey]) {
    displaySuggestions(suggestionCache[cacheKey]);
    return;
  }

  fetch(config.apiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "",
    },
    body: JSON.stringify({
      input: [
        {
          source: e,
        },
      ],
      config: {
        serviceId: "ai4bharat/indicxlit--gpu-t4",
        language: {
          sourceLanguage: "en",
          sourceScriptCode: "",
          targetLanguage: languageCode,
          targetScriptCode: "",
        },
        isSentence: !1,
        numSuggestions: 8,
      },
      controlConfig: {
        dataTracking: !0,
      },
    }),
  })
    .then((e) => e.json())
    .then((n) => {
      if (n.output && n.output.length > 0) {
        var t = n.output[0].target;

        t.push(e);
        var o = t
          .map(
            (e, n) =>
              `<div class="suggestion-item" data-index="${n}" draggable="true">${e}</div>`
          )
          .join("");

        suggestionCache[cacheKey] = t; // Store suggestions in cache using the new cache key

        let s;
        $suggestionSpan
          .html('<div class="suggestion-handle"></div>' + o)
          .show(),
          dragSuggestionBox(),
          $textObj.is("textarea") || $textObj.is("input:text")
            ? (s = $textObj.val())
            : $textObj.is("[contenteditable]") && (s = $textObj.text());
        let a = {
          keystrokes: s,
          results: n.output[0].target,
          opted: "",
          created_at: new Date().toISOString(),
          language: languageCode,
        };
        restart
          ? ((restart = !1), (logJsonArray = [a]))
          : (logJsonArray = [...logJsonArray, a]);
      }
    });
}


function displaySuggestions(suggestions) {
  let o = suggestions
    .map(
      (e, n) =>
        `<div class="suggestion-item" data-index="${n}" draggable="true">${e}</div>`
    )
    .join("");
  $suggestionSpan.html('<div class="suggestion-handle"></div>' + o).show();
  dragSuggestionBox();
}


function updateCurrentWord(e, n) {
  var t = e.val().split(/\s+/);
  t[t.length - 1] = n;
  var o = t.join(" ");
  if ((e.val(o), e.is("input:text") || e.is("textarea"))) {
    var s = e.val().length;
    e[0].setSelectionRange(s, s);
  } else e.is("[contenteditable]") && placeCaretAtEnd(e[0]);
  handleInput(e), e.trigger("input");
}

function handleSpaceBar(e) {
  var n = $(".suggestion-item.hovered").text() || $(".suggestion-item:last").text();
  if (n) {
    handleSuggestionSelectedLog(n);
    insertSuggestion(e, n);
    suggestionSelected = true;
    $suggestionSpan.hide().empty();
    handleInput(e);
  }
  return false;
}




function handleEnterKey(e) {
  var n =
    $(".suggestion-item.hovered").text() || $(".suggestion-item:first").text();
  if ((handleSuggestionSelectedLog(n), n))
    return (
      insertSuggestion(e, n),
      (suggestionSelected = !0),
      $suggestionSpan.hide().empty(),
      handleInput(e),
      !1
    );
}

function handleArrowKeys(e, n) {
  var t = $(".suggestion-item"),
    o = t.index($(".suggestion-item.selected")),
    s = t.length;
  38 === n ? (o = (o - 1 + s) % s) : 40 === n && (o = (o + 1) % s),
    t.removeClass("selected hovered");
  var a = t.eq(o).addClass("selected hovered"),
    i = $suggestionSpan.get(0),
    r = a.position().top,
    g = i.scrollTop,
    l = i.clientHeight;
  if (
    (r < 0
      ? (i.scrollTop = g + r)
      : r + a.height() > l && (i.scrollTop = g + r + a.height() - l),
    13 === n)
  ) {
    var u = $(".suggestion-item.selected").text();
    u &&
      (insertSuggestion(e, u),
      (suggestionSelected = !0),
      $suggestionSpan.hide().empty());
  }
  return !1;
}

function dragSuggestionBox() {
  function e(e) {
    e.preventDefault();
    var n = e.clientX - t,
      a = e.clientY - o;
    (n = Math.min(Math.max(n, 0), window.innerWidth - s.offsetWidth)),
      (a = Math.min(Math.max(a, 0), window.innerHeight - s.offsetHeight)),
      (s.style.left = n + "px"),
      (s.style.top = a + "px");
  }

  function n() {
    document.removeEventListener("mousemove", e),
      document.removeEventListener("mouseup", n);
  }
  var t,
    o,
    s = document.getElementById("suggestion");
  s.addEventListener("mousedown", function (a) {
    a.preventDefault(),
      (t = a.clientX - s.getBoundingClientRect().left),
      (o = a.clientY - s.getBoundingClientRect().top),
      document.addEventListener("mousemove", e),
      document.addEventListener("mouseup", n);
  });
}
$("body").on("focus", "[contenteditable],input, textarea", function () {
  $textObj = $(this);
  $textObj.off("input").on("input", function () {
    handleInput($textObj);
  });
  $textObj.off("blur").on("blur", function () {
    $suggestionSpan.hide().empty();
    suggestionSelected = false;
  });
  $textObj.off("keydown").on("keydown", function (e) {
    if ($suggestionSpan.is(":visible")) {
      var n = e.keyCode || e.which;
      if ((38 === n || 40 === n) && e.preventDefault(), 27 == n) {
        $suggestionSpan.hide().empty();
        suggestionSelected = false;
      } else if (38 === n || 40 === n) {
        handleArrowKeys($textObj, n);
      } else if (13 === n || 32 === n )  { // add space bar key code (32)
       
        var t = $(".suggestion-item.hovered").text() || $(".suggestion-item.selected").text();
        
        if (t) {
          handleSuggestionSelectedLog(t);
          insertSuggestion($textObj, t);
          suggestionSelected = true;
          e.preventDefault()
          $suggestionSpan.hide().empty();
          
        }
      }
    }
  });
});


  $suggestionSpan.on("mouseenter", ".suggestion-item", function () {
    $suggestionSpan
      .find(".suggestion-item")
      .removeClass("selected selected hovered"),
      $(this).addClass("selected hovered");
  }),
  $suggestionSpan.on("mouseleave", ".suggestion-item", function () {
    $(this).removeClass("selected hovered");
  }),
  $suggestionSpan.on("mousedown", ".suggestion-item", function (e) {
    handleSuggestionSelectedLog($(this).text());
    if (
      (e.preventDefault(),
      insertSuggestion($textObj, $(this).text()),
      (suggestionSelected = !0),
      $textObj.is("[contenteditable]"))
    ) {
      var n = $textObj[0].firstChild,
        t = document.createRange();
      t.setStart(n, n.length), t.collapse(!0);
      var o = window.getSelection();
      o.removeAllRanges(), o.addRange(t);
    } else $textObj.is("textarea") && $textObj[0].setSelectionRange($textObj.val().length, $textObj.val().length);
    $suggestionSpan.hide().empty(), $textObj.trigger("input");
  }),
  $("body").append($suggestionSpan);

function getCursorPosition(e) {
  var n = 0;
  if (e.is("input:text") || e.is("textarea")) n = e[0].selectionStart;
  else if (e.is("[contenteditable]")) {
    var t = window.getSelection().getRangeAt(0),
      o = t.cloneRange();
    o.selectNodeContents(e[0]),
      o.setEnd(t.endContainer, t.endOffset),
      (n = o.toString().length);
  }
  return n;
}

function placeCaretAtEnd(e) {
  if (
    (e.focus(),
    void 0 !== window.getSelection && void 0 !== document.createRange)
  ) {
    var n = document.createRange();
    n.selectNodeContents(e), n.collapse(!1);
    var t = window.getSelection();
    t.removeAllRanges(), t.addRange(n);
  } else if (void 0 !== document.body.createTextRange) {
    var o = document.body.createTextRange();
    o.moveToElementText(e), o.collapse(!1), o.select();
  }
}
applyStyles(
  '\n.custom-suggestion-box .close-button {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  cursor: pointer;\n  color: #000;\n}\n\n.suggestion-item.selected, .suggestion-item.hovered {\n  background-color: #333333;\n  color: #fff;\n}\n\n.suggestion-handle {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  width: 30px;\n  height: 5px;\n  cursor: move;\n  background-color: #333333;\n  border-radius: 4px;\n  transform: translateX(-50%);\n}\n\n.suggestion-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 5px;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  color: black;\n  font-family: "Open Sans", sans-serif;\n  cursor: pointer;\n}\n.suggestion-item.selected, .suggestion-item.hovered {\n  background-color: #f25a25;\n  color: #fff;\n}\n\n.suggestion-item:hover {\n  background-color: #f25a25;\n  cursor: pointer;\n  color: #fff;\n}\n\n.custom-suggestion-box {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: 20000;\n  background-color: #fff;\n  border-radius: 8px;\n  overflow: visible;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.custom-suggestion-box .close-button {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  cursor: pointer;\n  color: #000;\n}\n.suggestion-item.selected, .suggestion-item.hovered {\n  background-color: #333333;\n  color: #fff;\n}\n\n.suggestion-handle {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  width: 30px;\n  height: 5px;\n  cursor: move;\n  background-color: #333333;\n  border-radius: 4px;\n  transform: translateX(-50%);\n}\n\n.suggestion-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 5px;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  color: black;\n  font-family: "Open Sans", sans-serif;\n  cursor: pointer;\n}\n  .suggestion-item.selected, .suggestion-item.hovered {\n    background-color: #F25A25;\n    color: #fff;\n  }\n\n.custom-suggestion-box {\n  cursor: grab;\n  cursor: -webkit-grab;\n}\n\n.custom-suggestion-box:hover {\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\n.custom-suggestion-box {\n  opacity: 0.9;\n}\n\n.custom-suggestion-box:hover {\n  opacity: 1;\n}\n\n  .suggestion-item:hover {\n    background-color: #F25A25;\n    cursor: pointer;\n    color: #fff;\n  }\n  .custom-suggestion-box {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 20000;\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\n.custom-suggestion-box.dragging {\n  opacity: 0.9;\n}\n.custom-suggestion-box:hover {\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\n'
),
  chrome.runtime.onMessage.addListener(function (e, n, t) {
    "updateLanguage" === e.action && (languageCode = e.languageCode);
  }),
  document.addEventListener("DOMContentLoaded", function () {
    let e = document.getElementById("languageSelect"),
      n = localStorage.getItem("selectedLanguage");
    n && (e.value = n),
      e.addEventListener("change", function () {
        let n = e.value;
        "" !== n &&
          chrome.tabs.query(
            {
              active: !0,
              currentWindow: !0,
            },
            function (e) {
              let t = e[0];
              chrome.tabs.sendMessage(t.id, {
                action: "updateLanguage",
                languageCode: n,
              }),
                localStorage.setItem("selectedLanguage", n);
            }
          );
      });
  });
