(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  var phoneInput = document.getElementById("phone");
  function digitsOnly(str) {
    return (str || "").replace(/\D/g, "");
  }
  function formatUSPhone(digits) {
    if (digits.length === 11 && digits.charAt(0) === "1") digits = digits.slice(1);
    digits = digits.slice(0, 10);
    if (digits.length === 0) return "";
    if (digits.length < 4) return "(" + digits;
    if (digits.length < 7) return "(" + digits.slice(0, 3) + ") " + digits.slice(3);
    return "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
  }
  function isValidUSPhone(value) {
    var d = digitsOnly(value);
    if (d.length === 11 && d.charAt(0) === "1") d = d.slice(1);
    return d.length === 10;
  }
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      phoneInput.value = formatUSPhone(digitsOnly(phoneInput.value));
      try {
        phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
      } catch (e) {}
    });
  }

  function setStatus(el, kind, text) {
    if (!el) return;
    el.hidden = !text;
    el.classList.remove("is-error", "is-ok");
    if (kind) el.classList.add(kind);
    el.textContent = text || "";
  }

  var form = document.getElementById("apply-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var role = document.getElementById("role");
      var name = document.getElementById("name");
      var email = document.getElementById("email");
      var phone = document.getElementById("phone");
      var message = document.getElementById("message");
      var status = document.getElementById("form-status");
      var valid = true;

      [role, name, email, phone, message].forEach(function (el) {
        if (el) el.classList.remove("invalid");
      });

      if (!role || !role.value) {
        if (role) role.classList.add("invalid");
        valid = false;
      }
      if (!name || !name.value.trim()) {
        if (name) name.classList.add("invalid");
        valid = false;
      }
      if (!email || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        if (email) email.classList.add("invalid");
        valid = false;
      }
      if (!phone || !isValidUSPhone(phone.value)) {
        if (phone) phone.classList.add("invalid");
        valid = false;
      }
      if (!message || !message.value.trim()) {
        if (message) message.classList.add("invalid");
        valid = false;
      }

      if (!valid) {
        setStatus(status, "is-error", "Please complete the highlighted fields (US phone needs 10 digits).");
        var firstInvalid = form.querySelector(".invalid");
        if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
        return;
      }

      var phoneDigits = digitsOnly(phone.value);
      if (phoneDigits.length === 11 && phoneDigits.charAt(0) === "1") phoneDigits = phoneDigits.slice(1);
      var phoneFormatted = "+1 " + formatUSPhone(phoneDigits);

      var subject = "Amara Matchmaking Application — " + name.value.trim();
      var body =
        "Applying as: " + role.value + "\n" +
        "Name: " + name.value.trim() + "\n" +
        "Email: " + email.value.trim() + "\n" +
        "Phone: " + phoneFormatted + "\n\n" +
        "Message:\n" + message.value.trim() + "\n";

      var mailto =
        "mailto:hello@amaramatchmaking.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      setStatus(status, "is-ok", "Submitting your application…");

      // Prefer window.open for mobile mail clients; fall back to location
      var opened = window.open(mailto, "_self");
      if (!opened) {
        window.location.href = mailto;
      }
    });
  }
})();
