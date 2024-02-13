const { Router } = require("express");
var fs = require("fs");

const AboutUs = require("../models/aboutUs");
const Contacts = require("../models/contacts");
const Gallery = require("../models/gallery");
const EMPTYIMG = "/images/empty.png";
const router = new Router();

router.get("/", async (req, res) => {
  console.log(req.session, req.session.user);
  if (req.session.user === process.env.LOGIN) {
    try {
      const contacts = await Contacts.find();
      const aboutUs = await AboutUs.find();
      const gallery = await Gallery.find().sort({ date: -1 });

      return res.render("editing", { contacts, aboutUs, gallery });
    } catch (e) {
      console.error(e);
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.redirect("/");
  }
});

router.post("/edit_contact/:id", async (req, res) => {
  console.log(req.session, req.session.user);
  if (req.session.user === process.env.LOGIN) {
    try {
      const { phone, email } = req.body;
      const contactId = req.params.id;

      const existingAboutUs = await Contacts.findById(contactId);

      if (!existingAboutUs) {
        return res.status(404).send("Контакт не знайдено");
      }

      existingAboutUs.phone = phone;
      existingAboutUs.email = email;

      await existingAboutUs.save();

      return res.redirect("/deshychi_admin");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Помилка при редагуванні контакту" + error);
    }
  } else {
    return res.redirect("/");
  }
});

router.post("/edit_aboutus/:id", async (req, res) => {
  console.log(req.session, req.session.user);
  if (req.session.user === process.env.LOGIN) {
    try {
      const { description } = req.body;
      const aboutUsId = req.params.id;

      const existingAboutUs = await AboutUs.findById(aboutUsId);

      if (!existingAboutUs) {
        return res.status(404).send("Не існує такого компонента");
      }

      existingAboutUs.description = description;

      await existingAboutUs.save();

      return res.redirect("/deshychi_admin");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Помилка при редагуванні контакту" + error);
    }
  } else {
    return res.redirect("/");
  }
});

router.post("/add", async (req, res) => {
  console.log(req.session, req.session.user);
  if (req.session.user === process.env.LOGIN) {
    try {
      const galleryCount = await Gallery.countDocuments();

      if (galleryCount >= 10) {
        return res.render("errorPage", {
          error: "Досягнуто максимальну кількість записів в галереї, їх має бути максимум 10",
        });
      }

      let { description, img } = req.body;
      if (!req.file) {
        img = EMPTYIMG;
      } else {
        img = req.file.path;
      }

      const gallery = new Gallery({
        description,
        img,
        date: new Date(),
      });

      await gallery.save();

      return res.redirect("/deshychi_admin");
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  } else {
    return res.redirect("/");
  }
});

router.post("/edit", async (req, res) => {
  console.log(req.session, req.session.user);
  if (req.session.user === process.env.LOGIN) {
    try {
      const { id } = req.body;
      delete req.body.id;

      if (req.file) {
        if (req.body.oldImg != "/images/empty.png") {
          var filePath = `${req.body.oldImg}`;

          fs.unlinkSync(filePath);
        }
        req.body.img = req.file.path;
      }

      const gallery = await Gallery.findById(id);

      (req.body.date = new Date()), Object.assign(gallery, req.body);
      await gallery.save();

      return res.redirect("/deshychi_admin");
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  } else {
    return res.redirect("/");
  }
});

router.post("/remove", async (req, res) => {
  console.log(req.session, req.session.user);
  if (req.session.user === process.env.LOGIN) {
    try {
      const gallery = await Gallery.deleteOne({ _id: req.body.id });

      if (req.body.oldImg != "/images/empty.png") {
        var filePath = `${req.body.oldImg}`;
        fs.unlinkSync(filePath);
      }

      return res.redirect("/deshychi_admin");
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  } else {
    return res.redirect("/");
  }
});

module.exports = router;
