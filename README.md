# Toughts

# Desafios durante o projeto:

Um dos desafios durante a construção do projeto, foi a implementação das validações
de dados com sequelize, eu estava com um certa dificuldade para entender com capturar os erros que o sequelize enviava, porque está eu estava tentando pegar e passar os erros no controller, mas como o sequelize passava um array de errors não funcionaria para, pois eu queria exibir apenas 1 mensagem de erro por vez com o connect-flash.
Então eu decidi pegar os erros no UserModels, ai eu coloquei um try e catch dentro do UserModels para já passar o erro filtrado para o controler.
