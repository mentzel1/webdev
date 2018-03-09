// var age = prompt("Please enter your current age:");
// age = 365*age;

// alert("You have been alive " + age + " days!");

document.getElementById("ageInput").addEventListener("input", displayAgeInDays);

function displayAgeInDays(e) {
  const ageInDays = e.target.value * 365;
  if (ageInDays) {
    document.getElementById("ageText").innerHTML = 
      `You have been alive ${ageInDays} days!`;
  }
}