from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'dados_form'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, senha):
        self.senha_hash = generate_password_hash(senha)


    def check_password(self, senha):
        return check_password_hash(self.senha_hash, senha)

    def _repr_(self):
        return f'<User {self.username}>'