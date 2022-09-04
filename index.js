class Dog {
    constructor(name, breed, position) {
        this.name = name;
        this.breed = breed;
        this.position = position;
    }   
}

class Team {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        this.dogs = [];
    }
    addDog(dog) {
        if(dog instanceof Dog) {
            this.dogs.push(dog);
        } else {
            throw new Error(`Argument is not a Dog: ${dog}. Canine Skijoring is only for dogs.`);
        }
    }
}

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;

    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert("You got lost in the woods. \n Refresh the page to return to the Main Menu.")
    }

    showMainMenuOptions() {
        return prompt(`
        1) Create Team
        2) View Team
        3) Delete Team
        4) Display All Teams
        0) Exit and Reset
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt (`
        0) Go Back
        1) Enter Dog
        2) Remove Dog
        ___________________________
        ${teamInfo}
        `);
    }

    displayTeams() {
        let teamString = '';
        for (let i=0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '| Owner: ' + this.teams[i].owner + '\n';
        }
        alert(teamString);
    }

    createTeam() {
        let name = prompt('Enter New Team Name:');
        let owner = prompt('Enter Owner Name:')
        this.teams.push(new Team(name, owner));
        }

    viewTeam() {
        let index = prompt('Enter Team Number:');
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '| Owner: ' + this.selectedTeam.owner + '\n';

            for (let i = 0; i < this.selectedTeam.dogs.length; i++) {
                description += i + ') ' + this.selectedTeam.dogs[i].name + ', ' + this.selectedTeam.dogs[i].breed + ' - ' + this.selectedTeam.dogs[i].position + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1' :
                    this.createDog();
                    break;
                case '2' :
                    this.deleteDog();
            }
            
        }
    }

    deleteTeam() {
        let index = prompt('Enter number of Team you wish to delete');
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    createDog() {
        let name = prompt('Enter Dog');
        let breed = prompt('Enter Breed')
        let position = prompt('Enter Position');
        this.selectedTeam.dogs.push(new Dog(name, breed, position));
    }

    deleteDog() {
        let index = prompt('Enter Dogs roster number to remove');
        if (index > -1 && index < this.selectedTeam.dogs.length) {
            this.selectedTeam.dogs.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();