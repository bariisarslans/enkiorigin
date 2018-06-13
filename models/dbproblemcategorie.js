module.exports = function(sequelize, Sequelize){
    return sequelize.define('ProblemCategorie',{
        ProblemCategory : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                len : [0,500]
            }
        },
        TopCategoryID : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    });
}