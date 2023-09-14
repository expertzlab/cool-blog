const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('cool_blog', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });
  
  /*
	sequelize.authenticate().then(() => {
		console.log('Connected to db:')
	}).then((err) => {
		if(err)
		console.log('unable to connect to the database', err)
	})
	*/

	async function connect(){
		try {
			await sequelize.authenticate();
			console.log('Connection has been established successfully.');
		  } catch (error) {
			console.error('Unable to connect to the database:', error);
		  }
		  //sequelize.close() 
		  
	}

	connect();
  
	const User = sequelize.define('User', {
		// Model attributes are defined here
		firstName: { type: DataTypes.STRING, allowNull: false   },
		lastName: {type: DataTypes.STRING   } // allowNull defaults to true
	  });

	  sequelize.sync()
		.then(() => {
			console.log('Database and tables are synchronized.');
		})
		.catch((err) => {
			console.error('Error synchronizing the database:', err);
		});

async function createUser(){
	const smitha = await User.create({ firstName: "Smitha", lastName: "Agarwal" });
	console.log("smitha's auto-generated ID:", smitha.id);

}

//createUser();
const desiredfirstName = 'smitha'
async function listAllUsers(){
	const users = await User.findAll({   where: { firstName: desiredfirstName }});
	console.log("All users:", JSON.stringify(users, null, 2));
}

//listAllUsers();

async function updateUser(){
	const userIdToUpdate = 1; // Replace with the user's actual ID
    const userToUpdate = await User.findByPk(userIdToUpdate);
    if (!userToUpdate) { 
		console.log('User not found.');       
		return;    
	}
    // Update user information
    userToUpdate.firstName = 'NewFirstName';
    userToUpdate.lastName = 'NewLastName';

    // Save the updated user
    await userToUpdate.save();
    console.log('User updated successfully.');

}
//updateUser();


async function userDelete(){
	const userIdToDelete = 1
	User.destroy({ where: {id: userIdToDelete}})
	.then(() => { console.log(`User with ID ${userIdToDelete} has been deleted`) })
	.catch((err) => {  
	if(err) consol.log('Error deleting the user', err);
	})
}

userDelete();
