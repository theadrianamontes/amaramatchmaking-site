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
    form.querySelectorAll("input, textarea, select").forEach(function (el) {
      el.classList.remove("invalid");
    });

    var first = document.getElementById("first_name");
    var last = document.getElementById("last_name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var city = document.getElementById("city");
    var gender = document.getElementById("gender");
    var dob = document.getElementById("dob");
    var height = document.getElementById("height");
    var narrative = document.getElementById("narrative");
    var hobbies = document.getElementById("hobbies");
    var faith = document.getElementById("faith");
    var marital = document.getElementById("marital");
    var occupation = document.getElementById("occupation");
    var employer = document.getElementById("employer");
    var haveKids = document.getElementById("have_kids");
    var wantKids = form.querySelector('input[name="want_kids"]:checked');
    var headshot = document.getElementById("headshot");
    var terms = document.getElementById("terms");
    var valid = true;

    function need(el, ok) {
      if (!ok) {
        if (el) el.classList.add("invalid");
        valid = false;
      }
    }

    need(first, first && first.value.trim());
    need(last, last && last.value.trim());
    need(email, email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    need(phone, phone && isValidUSPhone(phone.value));
    need(city, city && city.value.trim());
    need(gender, gender && gender.value);
    need(dob, dob && dob.value);
    need(height, height && height.value);
    need(narrative, narrative && narrative.value.trim().length > 40);
    need(hobbies, hobbies && hobbies.value.trim());
    need(faith, faith && faith.value);
    need(marital, marital && marital.value);
    need(occupation, occupation && occupation.value.trim());
    need(employer, employer && employer.value.trim());
    need(haveKids, haveKids && haveKids.value);
    if (!wantKids) valid = false;
    need(headshot, headshot && headshot.files && headshot.files.length);
    need(terms, terms && terms.checked);

    if (!valid) {
      setStatus(status, "is-error", "Please complete the required fields (US phone needs 10 digits; include a face photo; accept terms).");
      var firstInvalid = form.querySelector(".invalid");
      if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
      return;
    }

    var phoneDigits = digitsOnly(phone.value);
    if (phoneDigits.length === 11 && phoneDigits.charAt(0) === "1") phoneDigits = phoneDigits.slice(1);
    var phoneFormatted = "+1 " + formatUSPhone(phoneDigits);

    var subject = "Amara private intake - " + first.value.trim() + " " + last.value.trim();
    var body =
      "Amara Matchmaking - Confidential intake\n\n" +
      "First name: " + first.value.trim() + "\n" +
      "Last name: " + last.value.trim() + "\n" +
      "Email: " + email.value.trim() + "\n" +
      "Phone: " + phoneFormatted + "\n" +
      "City: " + city.value.trim() + "\n" +
      "Gender: " + gender.value + "\n" +
      "Date of birth: " + dob.value + "\n" +
      "Instagram: " + (document.getElementById("instagram").value.trim() || "-") + "\n" +
      "LinkedIn: " + (document.getElementById("linkedin").value.trim() || "-") + "\n" +
      "Height: " + height.value + "\n" +
      "Hobbies: " + hobbies.value.trim() + "\n" +
      "Faith/religion: " + faith.value + "\n" +
      "Marital status: " + marital.value + "\n" +
      "Occupation: " + occupation.value.trim() + "\n" +
      "Employer: " + employer.value.trim() + "\n" +
      "Currently have children: " + haveKids.value + "\n" +
      "Want to have kids: " + wantKids.value + "\n\n" +
      "About:\n" + narrative.value.trim() + "\n\n" +
      "(Please attach the face photo selected in the form if it did not attach automatically.)\n";

    var mailto =
      "mailto:ceo@amaramatchmaking.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    setStatus(status, "is-ok", "Opening your email to submit. Please attach your face photo if prompted.");
    window.location.href = mailto;
  });
})();
