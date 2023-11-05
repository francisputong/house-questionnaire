describe('Multi Step Form', () => {
    it('should fill out the foundation form and store data in localStorage', () => {
        cy.visit('/start');

        /**
         * Foundation
         * */
        cy.get('[data-cy=Slab]').click();

        const n = 4;

        for (let i = 0; i < n; i++) {
            cy.get('[data-cy=increase-length]').click();
        }

        cy.get('[data-cy=increase-width]').click();
        cy.get('[data-cy=increase-height]').click();

        cy.get('[data-cy=submit-button]').click();

        // Verify that the form data is stored in localStorage
        cy.window().its('localStorage').should('have.property', 'houseForm');

        // Get the stored data from localStorage
        cy.window()
            .its('localStorage.houseForm')
            .then((storedData) => {
                const parsedData = JSON.parse(storedData);

                // Assertions for the stored data
                expect(parsedData.foundationType).to.equal('slab');
                expect(parsedData.foundationSize.length).to.equal(54);
                expect(parsedData.foundationSize.width).to.equal(51);
                expect(parsedData.foundationSize.height).to.equal(51);
            });

        /**
         * Floor
         * */
        for (let i = 0; i < n; i++) {
            cy.get(`[data-cy=increase-floor-0-rooms-0-size]`).click();
        }

        cy.get(`#floorDetails-0-rooms-0-roomType`).type('Lounge{enter}');
        cy.get(`#floorDetails-0-rooms-0-floorType`).type('Car{enter}');
        cy.get(`#floorDetails-0-rooms-0-additionalFurniture`).type('Televis{enter}');
        cy.get(`#floorDetails-0-rooms-0-windows-0-style`).type('full{enter}');
        cy.get(`#floorDetails-0-rooms-0-windows-0-glassType`).type('triple{enter}');

        cy.get('[data-cy=submit-button]').click();

        cy.window()
            .its('localStorage.houseForm')
            .then((storedData) => {
                const parsedData = JSON.parse(storedData);

                expect(parsedData.floorDetails).to.be.an('array');

                const firstFloorDetails = parsedData.floorDetails[0];
                expect(firstFloorDetails).to.be.an('object');

                const firstRooms = firstFloorDetails.rooms;
                expect(firstRooms).to.be.an('array');
                expect(firstRooms[0].size).to.equal(54);
                expect(firstRooms[0].roomType).to.equal('Lounge');
                expect(firstRooms[0].floorType).to.equal('Carpet');
                expect(firstRooms[0].additionalFurniture).to.equal('Television');
                expect(firstRooms[0].windows[0].style).to.equal('Full Height');
                expect(firstRooms[0].windows[0].glassType).to.equal('Triple Glazed');
            });

        /**
         * Roof and Garden
         * */
        cy.get('[data-cy=Tiled]').click();
        cy.get(`#gardenPlants`).type('rosa bur{enter}');

        cy.get('[data-cy=submit-button]').click();

        cy.window()
            .its('localStorage.houseForm')
            .then((storedData) => {
                const parsedData = JSON.parse(storedData);

                expect(parsedData.roofType).to.equal('Tiled');
                expect(parsedData.gardenPlants).to.be.an('array');
                expect(parsedData.gardenPlants[0].label).to.equal('Azalea');
                expect(parsedData.gardenPlants[1].label).to.equal('Rosa Burgundy');
            });

        cy.get('[data-cy=finish-button]').click();

        cy.window().then((win) => {
            const keyToCheck = 'houseForm';

            expect(win.localStorage.getItem(keyToCheck)).to.be.null;
        });

        cy.url().should('eq', Cypress.config().baseUrl);
    });
});
