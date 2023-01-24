describe("Dashboard Page Tes Cases", () =>{
    it("Do Login with correct value", () => {
        cy.visit("http://localhost:3000");
        // Input email benar
        const email = cy.get("input[name='email']");
        email.type("user@react.test");
        // Input password
        const password = cy.get("input[name='password']");
        password.type("password");
        // Enter Button
        const button = cy.get("button");
        button.click();
        // Menampilkan window alert "welcome"
        cy.on("window:alert", (t) => {
          expect(t).to.contains("welcome");
        });
        cy.url().should('eq', 'http://localhost:3000/dashboard')
      });

    it("Found No Post For The First Time", ()=> {
        cy.visit("http://localhost:3000/dashboard");
        // Memvalidasi tulisan "Found 0 photos"
        cy.contains("Found 0 photos");
    });

    it("Contains Image url, description input and publish button", ()=> {
        cy.visit("http://localhost:3000/dashboard");
        // Input image
        const imageInput = cy.get("input[name='image']");
        imageInput.should("be.visible");
        imageInput.should("have.attr", "type", "url");
        imageInput.should("have.attr", "required", "required");
        imageInput.should("have.attr", "placeholder", "Image URL");
        // Input Deskripsi
        const descriptionInput = cy.get("input[name='desc']");
        descriptionInput.should("be.visible");
        descriptionInput.should("have.attr", "type", "text");
        descriptionInput.should("have.attr", "required", "required");
        descriptionInput.should("have.attr", "placeholder", "What's on your mind?");
        // Button publish
        const buttonPublish = cy.get("button");
        buttonPublish.should("be.visible");
        buttonPublish.contains("Publish!");
        buttonPublish.should("have.css", "background-color", "rgb(79, 70, 229)");
        buttonPublish.should("have.css", "color", "rgb(255, 255, 255)");
    });

    it("Upload Some Photos", () => {
        cy.visit("http://localhost:3000/dashboard");
        
        const photos = [
            {
                imageValue:
                "https://media.istockphoto.com/id/1358640729/photo/full-moon-over-lake-with-mountains-night-scene-moonlight-scenic-landscape-purple-sky-3d.jpg?b=1&s=170667a&w=0&k=20&c=Tyg0ZpYw_8FRQU_SjI6WL8vAT7UYCHwfHOxYqesQkMM=",
                descriptionValue:
                "The moon beautifull isn't it?",
            },
            {
                imageValue:
                "https://media.istockphoto.com/id/1353814205/photo/beautiful-dream-like-photo-of-flying-above-the-clouds.jpg?b=1&s=170667a&w=0&k=20&c=tCGNY7cfQFKtp1kYvUkLa4GkTNiQlj8CeCDYo1dCVMo=",
                descriptionValue:
                "The sunset beautifull isn't it?",
            },
        ];

        photos.forEach(({ imageValue, descriptionValue}) =>{
            const image = cy.get("input[name='image']");
            image.type(imageValue);
            
            const description = cy.get("input[name='desc']");
            description.type(descriptionValue);

            const button = cy.get("button");
            button.click();

            // check upload image is exist
            cy.get("img").should("have.attr", "src", imageValue);
            cy.contains(descriptionValue);
        });
            //cy.get("Found '$[photos.length]' photos")
    });
});