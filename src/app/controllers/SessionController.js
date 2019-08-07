const { User } = require("../models");

class SessionController {
  create(req, res) {
    return res.render("auth/login");
  }

  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("Usuário não encontrado");
      return res.redirect("/");
    }

    if (!(await user.checkPassword(password))) {
      console.log("Senha incorreta");
      return res.redirect("/");
    }

    req.session.user = user;

    res.redirect("/app/dashboard");
  }
}

module.exports = new SessionController();
