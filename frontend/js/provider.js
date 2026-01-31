const foodList = document.getElementById("foodList");

async function postFood() {
  const foodType = document.getElementById("foodType").value;
  const quantity = document.getElementById("quantity").value;
  const preparedAt = new Date().toISOString(); // current time
  const expiryTimeInput = document.getElementById("expiryTime").value;
  
  // convert expiryTime (HH:MM) to today's ISO string
  const [hours, minutes] = expiryTimeInput.split(":");
  const now = new Date();
  const expiresAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes).toISOString();
  
  const location = "Your Restaurant"; // you can replace with dynamic value

  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/food/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ foodType, quantity, preparedAt, expiresAt, location })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Food posted successfully!");
  loadMyFood(); // refresh the dashboard
}

// fetch provider's posted food
async function loadMyFood() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/food/mine", { // we will create this API
    headers: { "Authorization": "Bearer " + token }
  });

  const foods = await res.json();

  foodList.innerHTML = ""; // clear existing

  foods.forEach(food => {
    const div = document.createElement("div");
    div.className = "food-card";
    div.innerHTML = `
      <p><strong>${food.foodType}</strong></p>
      <p>Quantity: ${food.quantity}</p>
      <p>Expires at: ${new Date(food.expiresAt).toLocaleTimeString()}</p>
      <p>Status: <b>${food.status}</b></p>
    `;
    foodList.appendChild(div);
  });
}

// call load on page load
window.onload = () => {
  loadMyFood();
};
