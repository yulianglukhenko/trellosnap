// Generated by CoffeeScript 1.8.0
(function() {
  var Selection;

  Selection = (function() {
    var $bottom_overlay, $box, $cancel, $capture, $left_overlay, $retake, $right_overlay, $top_overlay, $trellosnap, append_confirmation_buttons, append_selection_box, bind_confirmation_buttons, confirmation_buttons_html, disable_scroll, mouse_x, mouse_y, position_confirmation_buttons, reenable_scroll, reinit_selection, resize_bottom_overlay, resize_right_overlay, resize_selection_box, resize_top_overlay, selection_box_html, start_drawing_box, stop_drawing_box, win_w, win_y;

    function Selection() {}

    $trellosnap = void 0;

    $box = void 0;

    $top_overlay = void 0;

    $right_overlay = void 0;

    $bottom_overlay = void 0;

    $left_overlay = void 0;

    win_w = void 0;

    win_y = void 0;

    $cancel = void 0;

    $retake = void 0;

    $capture = void 0;

    Selection.init_selection = function() {
      if (!$("#trellosnap").length) {
        append_selection_box();
      }
      return $(document).on("mousedown", function(e) {
        e.preventDefault();
        return start_drawing_box(mouse_x(e), mouse_y(e));
      }).on("mouseup", function(e) {
        e.preventDefault();
        return stop_drawing_box();
      });
    };

    reinit_selection = function() {
      $trellosnap.remove();
      return Selection.init_selection();
    };

    mouse_x = function(e) {
      return e.pageX - $trellosnap.offset().left;
    };

    mouse_y = function(e) {
      return e.pageY - $trellosnap.offset().top;
    };

    start_drawing_box = function(x, y) {
      disable_scroll();
      win_w = $(window).outerWidth();
      win_y = $(window).outerHeight();
      $box.css({
        left: "" + x + "px",
        top: "" + y + "px"
      });
      $top_overlay.css({
        width: "" + x + "px",
        height: "" + y + "px"
      });
      $right_overlay.css({
        width: "" + (win_w - x) + "px",
        height: "" + y + "px"
      });
      $bottom_overlay.css({
        width: "" + (win_w - x) + "px",
        height: "" + (win_y - y) + "px"
      });
      $left_overlay.css({
        width: "" + x + "px",
        height: "" + (win_y - y) + "px"
      });
      return $(document).on("mousemove", (function(_this) {
        return function(e) {
          resize_selection_box(x, y, mouse_x(e), mouse_y(e));
          resize_top_overlay(x, mouse_x(e));
          resize_right_overlay(x, y, mouse_x(e), mouse_y(e));
          return resize_bottom_overlay(y, mouse_y(e));
        };
      })(this));
    };

    stop_drawing_box = function() {
      $(document).unbind("mousedown");
      $(document).unbind("mouseup");
      $(document).unbind("mousemove");
      return append_confirmation_buttons();
    };

    append_selection_box = function() {
      $("body").append(selection_box_html());
      $trellosnap = $("#trellosnap");
      $box = $("#trellosnap-selection-box");
      $top_overlay = $("#trellosnap-overlay-top");
      $right_overlay = $("#trellosnap-overlay-right");
      $bottom_overlay = $("#trellosnap-overlay-bottom");
      return $left_overlay = $("#trellosnap-overlay-left");
    };

    selection_box_html = function() {
      return "<div id=\"trellosnap\">\n  <div class=\"trellosnap-overlay\" id=\"trellosnap-overlay-top\"></div>\n  <div class=\"trellosnap-overlay\" id=\"trellosnap-overlay-right\"></div>\n  <div class=\"trellosnap-overlay\" id=\"trellosnap-overlay-bottom\"></div>\n  <div class=\"trellosnap-overlay\" id=\"trellosnap-overlay-left\"></div>\n  <div id=\"trellosnap-selection-box\"></div>\n</div>";
    };

    resize_selection_box = function(old_x, old_y, new_x, new_y) {
      return $box.css({
        width: "" + (new_x >= old_x ? new_x - old_x : "0") + "px",
        height: "" + (new_y >= old_y ? new_y - old_y : "0") + "px"
      });
    };

    resize_top_overlay = function(old_x, new_x) {
      return $top_overlay.css("width", "" + (new_x >= old_x ? new_x : old_x));
    };

    resize_right_overlay = function(old_x, old_y, new_x, new_y) {
      return $right_overlay.css({
        width: "" + (new_x >= old_x ? win_w - new_x : win_w - old_x) + "px",
        height: "" + (new_y >= old_y ? new_y : old_y) + "px"
      });
    };

    resize_bottom_overlay = function(old_y, new_y) {
      return $bottom_overlay.css("height", "" + (new_y >= old_y ? win_y - new_y : win_y - old_y) + "px");
    };

    disable_scroll = function() {
      return $("html, body").addClass("trellosnap-no-scroll");
    };

    reenable_scroll = function() {
      return $("html, body").removeClass("trellosnap-no-scroll");
    };

    append_confirmation_buttons = function() {
      $box.append(confirmation_buttons_html());
      $cancel = $("#trellosnap-button-cancel");
      $retake = $("#trellosnap-button-retake");
      $capture = $("#trellosnap-button-capture");
      position_confirmation_buttons();
      return bind_confirmation_buttons();
    };

    confirmation_buttons_html = function() {
      return "<div class=\"trellosnap-button\" id=\"trellosnap-button-cancel\"></div>\n<div class=\"trellosnap-button\" id=\"trellosnap-button-retake\"></div>\n<div class=\"trellosnap-button\" id=\"trellosnap-button-capture\"></div>";
    };

    position_confirmation_buttons = function() {
      if ($box.outerHeight() < 65 && $box.outerWidth() < 99) {
        return $box.addClass("small");
      } else if ($box.outerHeight() < 65) {
        return $box.addClass("short");
      } else if ($box.outerWidth() < 99) {
        return $box.addClass("narrow");
      }
    };

    bind_confirmation_buttons = function() {
      $cancel.on("click", function() {
        reenable_scroll();
        return $trellosnap.remove();
      });
      $retake.on("click", function() {
        return reinit_selection();
      });
      return $capture.on("click", function() {
        var image_info;
        image_info = {
          w: $box.outerWidth(),
          h: $box.outerHeight(),
          x: $box.position().left,
          y: $box.position().top
        };
        $trellosnap.remove();
        reenable_scroll();
        $(window).trigger('resize');
        return chrome.runtime.sendMessage({
          capture: true,
          image_info: image_info
        });
      });
    };

    return Selection;

  })();

  jQuery(function() {
    return Selection.init_selection();
  });

}).call(this);