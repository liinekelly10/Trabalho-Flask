from flask import Flask, request, redirect, url_for, render_template
from models import db, User
from werkzeug.security import generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/dados_form'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
migrate = Migrate(app, db)


class User(db.Model):
    __tablename__ = 'dados_form'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def check_password(self, senha):
        return check_password_hash(self.senha_hash, senha)

    def __repr__(self):
        return f'<User {self.username}>'

@app.route('/cadastrar', methods=['GET', 'POST'])
def cadastrar():
    if request.method == 'POST':
        nome = request.form['nome']
        username = request.form['username']
        email = request.form['email']
        senha = request.form['senha']

        novo_usuario = User(nome=nome, username=username, email=email)
        novo_usuario.set_password(senha)

        db.session.add(novo_usuario)
        db.session.commit()

        return redirect(url_for('login'))

    return render_template('cadastro.html')

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        senha = request.form['senha']

        usuario = User.query.filter_by(username=username).first()
        if usuario and usuario.check_password(senha):
            return redirect(url_for('criar_formulario'))
        else:
            return "Credenciais inválidas"

    return render_template('login.html')

@app.route('/criar-formulario', methods=['GET', 'POST'])
def criar_formulario():
    if request.method == 'POST':
        return redirect(url_for('some_page'))

    return render_template('criar-formulario.html')

@app.route('/cadastro-realizado')
def some_page():
    return "Usuário cadastrado com sucesso!"

@app.route('/usuarios')
def listar_usuarios():
    usuarios = User.query.all()
    return render_template('usuarios.html', usuarios=usuarios)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
