from sqlalchemy import Column, Integer, String, Float, JSON
from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    twelfth_percentage = Column(Float, nullable=True)
    skills = Column(JSON, default=[])
    interests = Column(JSON, default=[])
