class Letter {
    constructor() {
        this.users = [];
        this.posts = [];
    }

    async get() {
        try {
            const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
            const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');

            this.users = await usersResponse.json();
            this.posts = await postsResponse.json();


            const data = this.users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    address: this.address(user.address),
                    phone: user.phone,
                    website: user.website,
                    company: user.company.name,
                    posts: this.posts.filter(post => post.userId === user.id)
                }
            });
            return data;
        } catch (err) {
            let errorMessage = document.createElement("div");
            errorMessage.classList.add("error-message");
            document.getElementById("letters_dash").appendChild(errorMessage);

            let errorText = document.createElement("p");
            errorText.textContent = "Poxa, não conseguimos acessar.";
            errorMessage.appendChild(errorText);

            let reloadButton = document.createElement("button");
            reloadButton.textContent = "Clique aqui para recarregar";
            reloadButton.addEventListener("click", location.reload);
            errorText.appendChild(reloadButton);

            console.error(err);
        }
    }

    address(data) {
        return ((data.street + ', ' + data.suite + '-' + data.zipcode + ', ' + data.city).toString())
    }

}


const letter = new Letter();

letter.get().then(data => {

    let element = document.createElement("div");
    element.innerHTML = data.map(dt => `
    <div class="letters__list__item">
      <h1 class="letters__list__item__name">`+ dt.name + `</h1>
    </div> 
    <div class="letters__writer">
      <div class="letters__writer__data">
        <div class="letters__writer__data__professional">
          <h4 class="letters__writer__data__professional__username">`+ dt.username + `</h4>
          <h4 class="letters__writer__data__professional__address">`+ dt.address + `</h4>
          <h4 class="letters__writer__data__professional__company">`+ dt.company + `</h4>
        </div>
        <div class="letters__writer__data__contact">
        <h4 class="letters__writer__data__contact__email">`+ dt.email + `</h4>
        <h4 class="letters__writer__data__contact__phone">`+ dt.phone + `</h4>
        <h4 class="letters__writer__data__contact__website">`+ dt.website + `</h4>
      </div>
    </div>
    <div class="letters__item">
      `+ dt.posts.map(post => `
      <div class="letters__item__post">
        <h4 class="letters__item__post__title">`+ post.title + `</h4>
        <h5 class="letters__item__post__body">`+ post.body + `</h5>
      </div>`
      ).join('') + `
    </div>
  </div>
   `).join('')
  document.getElementById("letters__list").appendChild(element);
});


export default Letter;