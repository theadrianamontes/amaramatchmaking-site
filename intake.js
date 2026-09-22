(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

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
    });
  }

  function setStatus(el, kind, text) {
    if (!el) return;
    el.hidden = !text;
    el.classList.remove("is-error", "is-ok");
    if (kind) el.classList.add(kind);
    el.textContent = text || "";
  }

  var form = document.getElementById("intake-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var status = document.getElementById("form-status");
    var fields = form.querySelectorAll("input, textarea");
    fields.forEach(function (el) { el.classList.remove("invalid"); });

    var name = document.getElementById("full_name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var dob = document.getElementById("dob");
    var city = document.getElementById("city");
    var occupation = document.getElementById("occupation");
    var narrative = document.getElementById("narrative");
    var headshot = document.getElementById("headshot");
    var kids = form.querySelector('input[name="kids"]:checked');
    var valid = true;

    function need(el, ok) {
      if (!ok) { el.classList.add("invalid"); valid = false; }
    }
    need(name, name && name.value.trim());
    need(email, email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    need(phone, phone && isValidUSPhone(phone.value));
    need(dob, dob && dob.value);
    need(city, city && city.value.trim());
    need(occupation, occupation && occupation.value.trim());
    need(narrative, narrative && narrative.value.trim().length > 40);
    need(headshot, headshot && headshot.files && headshot.files.length);
    if (!kids) valid = false;

    if (!valid) {
      setStatus(status, "is-error", "Please complete the required fields (US phone needs 10 digits; include a headshot).");
      var firstInvalid = form.querySelector(".invalid") || form.querySelector('input[name="kids"]');
      if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
      return;
    }

    var phoneDigits = digitsOnly(phone.value);
    if (phoneDigits.length === 11 && phoneDigits.charAt(0) === "1") phoneDigits = phoneDigits.slice(1);
    var phoneFormatted = "+1 " + formatUSPhone(phoneDigits);

    var subject = "Amara private intake  -  " + name.value.trim();
    var body =
      "Amara Matchmaking  -  Confidential intake\n\n" +
      "Full name: " + name.value.trim() + "\n" +
      "Email: " + email.value.trim() + "\n" +
      "Phone: " + phoneFormatted + "\n" +
      "Date of birth: " + dob.value + "\n" +
      "City: " + city.value.trim() + "\n" +
      "Occupation: " + occupation.value.trim() + "\n" +
      "Company: " + (document.getElementById("company").value.trim() || " - ") + "\n" +
      "Height: " + (document.getElementById("height").value.trim() || " - ") + "\n" +
      "Want kids: " + kids.value + "\n" +
      "Instagram: " + (document.getElementById("instagram").value.trim() || " - ") + "\n" +
      "LinkedIn: " + (document.getElementById("linkedin").value.trim() || " - ") + "\n\n" +
      "About:\n" + narrative.value.trim() + "\n\n" +
      "(Please attach the headshot selected in the form if it did not attach automatically.)\n";

    var mailto =
      "mailto:ceo@amaramatchmaking.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    setStatus(status, "is-ok", "Opening your email to submit. Please attach your headshot if prompted.");
    window.location.href = mailto;
  });
})();
