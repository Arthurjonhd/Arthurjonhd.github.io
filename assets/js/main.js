/* ==========================================================================
   DLAS Holdings Corp — main.js
   Vanilla JS, no dependencies, no build step. Everything here is a progressive
   enhancement: the site is fully readable and navigable without it.
   Blocks: 1. Mobile nav  2. Header shadow  3. Reveal on scroll
           4. Footer year  5. Contact form
   ========================================================================== */
(function () {
  "use strict";

  /* 1. Mobile navigation --------------------------------------------------- */

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  var mobileQuery = window.matchMedia("(max-width: 47.99em)");

  function setNav(open) {
    if (!header || !toggle) return;
    header.classList.toggle("is-nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (header && toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-nav-open")) {
        setNav(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!header.classList.contains("is-nav-open")) return;
      if (!header.contains(event.target)) setNav(false);
    });

    // Leaving the mobile breakpoint must not leave the panel state behind.
    var onBreakpoint = function (event) {
      if (!event.matches) setNav(false);
    };
    if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", onBreakpoint);
    else if (mobileQuery.addListener) mobileQuery.addListener(onBreakpoint);
  }

  /* 2. Header shadow after scroll ------------------------------------------ */

  if (header) {
    var ticking = false;
    var applyShadow = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    };
    applyShadow();
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(applyShadow);
      },
      { passive: true }
    );
  }

  /* 3. Reveal on scroll ---------------------------------------------------- */

  var revealables = document.querySelectorAll(".reveal");

  if (revealables.length) {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      Array.prototype.forEach.call(revealables, function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      Array.prototype.forEach.call(revealables, function (el) {
        observer.observe(el);
      });
    }
  }

  /* 4. Footer year --------------------------------------------------------- */

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* 5. Contact form -------------------------------------------------------- */

  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  // Native validation stays on when JS is unavailable; here we replace it with
  // inline messages, so switch it off only once this script is running.
  form.noValidate = true;

  var alertBox = form.querySelector("[data-form-alert]");
  var success = document.querySelector("[data-form-success]");
  var submitBtn = form.querySelector("[data-submit]");
  var submitLabel = submitBtn ? submitBtn.textContent : "";
  var emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  function fieldOf(input) {
    return input.closest(".field");
  }

  function showError(input, message) {
    var field = fieldOf(input);
    if (!field) return;
    var error = field.querySelector(".field__error");
    field.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  }

  function clearError(input) {
    var field = fieldOf(input);
    if (!field) return;
    field.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
  }

  function validate(input) {
    var value = (input.value || "").trim();

    if (input.hasAttribute("required") && !value) {
      showError(input, input.dataset.errorRequired || "This field is required.");
      return false;
    }
    if (input.type === "email" && value && !emailPattern.test(value)) {
      showError(input, "Enter a valid email address, e.g. name@example.com.");
      return false;
    }
    clearError(input);
    return true;
  }

  var inputs = form.querySelectorAll("input[required], select[required], textarea[required], input[type='email']");

  Array.prototype.forEach.call(inputs, function (input) {
    input.addEventListener("blur", function () {
      validate(input);
    });
    input.addEventListener("input", function () {
      if (fieldOf(input) && fieldOf(input).classList.contains("has-error")) validate(input);
    });
  });

  function setAlert(message) {
    if (!alertBox) return;
    alertBox.textContent = message || "";
    alertBox.hidden = !message;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setAlert("");

    var firstInvalid = null;
    Array.prototype.forEach.call(inputs, function (input) {
      if (!validate(input) && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      setAlert("Please check the highlighted fields and try again.");
      firstInvalid.focus();
      return;
    }

    // Honeypot: a filled checkbox means a bot. Fail silently.
    var honey = form.querySelector("input[name='botcheck']");
    if (honey && honey.checked) return;

    var data = new FormData(form);

    if (submitBtn) {
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.textContent = "Sending…";
    }

    fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    })
      .then(function (response) {
        return response.json().then(function (json) {
          return { ok: response.ok && json.success, json: json };
        });
      })
      .then(function (result) {
        if (!result.ok) throw new Error(result.json && result.json.message);
        if (success) {
          form.hidden = true;
          success.hidden = false;
          success.focus();
        }
      })
      .catch(function () {
        setAlert(
          "Sorry — the message could not be sent. Please email dlasholdingscorp@gmail.com and we'll pick it up from there."
        );
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.removeAttribute("aria-busy");
          submitBtn.textContent = submitLabel;
        }
      });
  });
})();
