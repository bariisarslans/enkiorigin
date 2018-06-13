module.exports = function(sequelize, Sequelize){
    return sequelize.define('user',{
        CookieID : {
            type : Sequelize.STRING,
            allowNull : true,
            validate : {
                len : [0,500]
            }
        },
        IP : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                len : [0,50]
            }
        },
        MacAddress : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                len : [0,500]
            }
        },
        UserName : {
            type : Sequelize.STRING,
            allowNull : true,
            validate : {
                len: [0,500]
            }
        },
        ProblemID : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        GenderID : {
            type: Sequelize.STRING,
            allowNull : true
        },
        Age : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        Email : {
            type : Sequelize.STRING,
            allowNull : true
        },
        UserStatus : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                len : [0,15]
            }
        },
        FacebookURL : {
            type : Sequelize.STRING,
            allowNull : true
        },
        TwitterURL : {
            type : Sequelize.STRING,
            allowNull : true
        },
        InstagramURL : {
            type : Sequelize.STRING,
            allowNull : true
        }
    });
}