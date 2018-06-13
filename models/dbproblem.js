module.exports = function(sequelize, Sequelize){
    return sequelize.define('Problem',{
        ProblemValue : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                len : [0,500]
            }
        },
        ProblemCategoryID : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    });
}