module.exports = function(sequelize, Sequelize){
        return sequelize.define('Word',{
            Word : {
                type : Sequelize.STRING,
                allowNull : false,
                validate : {
                    len : [0,500]
                }
            },
            ProblemID : {
                type : Sequelize.INTEGER,
                allowNull : false
            }
        });
}
    
    