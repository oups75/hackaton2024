const login = document.querySelector("#loginForm");

//EventListener du login
login.addEventListener("submit", (event) => {
  event.preventDefault();
  loginManagement();
});

// FUNCTIONS

// This function manages the connection
async function loginManagement() {
  let tel = document.getElementById("tel").value;
  let password = document.getElementById("password").value;
  let lastName = document.getElementById("lastName").value;
  let firstName = document.getElementById("firstName").value;
  let role = document.getElementById("role").value;

  // Sending ids
try {
    const reponse = await fetch(`http://localhost:3000/utilisateurs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telephone: tel,
        mot_de_passe: password,
        nom: lastName,
        prenom:firstName,
        role: role
      }),
    });
    // Saving token and home page return or error message
    const dataReponse = await reponse.json();
    if (reponse.ok) {
      enregistrementToken(dataReponse);
      window.location.href = "index.html";
    }else{
      const errorText = "email ou mot de passe non valide";
      errorMessage(errorText, "loginError")
    }
  } catch (error) {
    const errorText = "Connexion impossible : pas de réponse";
    errorMessage(errorText, "loginError") 
  }
}