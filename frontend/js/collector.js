const token = localStorage.getItem("token");

async function loadAvailableFood() {
  try {
    const res = await fetch("http://localhost:5000/api/food/available", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch food");

    const foods = await res.json();
    const container = document.getElementById("availableFood");
    container.innerHTML = "";

    foods.forEach((food) => {
      // Format the date
      const expiry = new Date(food.expiresAt);
      const formattedTime = expiry.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDate = expiry.toLocaleDateString();

      const div = document.createElement("div");
      div.className = "food-card";

      div.innerHTML = `
    <div class="food-info">
      <span>${food.foodType}</span>
      <span>${food.quantity} servings</span>
      <span>Expires at: ${formattedTime} on ${formattedDate}</span>
      <span>Provider: ${food.providerId.name}</span>
    </div>
    <button class="accept-btn" onclick="acceptFood('${food._id}')">Accept</button>
  `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

// Call on page load
document.addEventListener("DOMContentLoaded", loadAvailableFood);

// Optional: function to accept a food
async function acceptFood(foodId) {
  try {
    const res = await fetch(`http://localhost:5000/api/food/${foodId}/accept`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to accept food");

    alert("Food accepted!");
    loadAvailableFood(); // refresh list
  } catch (err) {
    alert(err.message);
  }
}
