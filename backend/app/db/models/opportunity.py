from sqlalchemy import Column, Integer, String, Date
from app.db.session import Base

class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    type = Column(String, index=True) # internship / scholarship / hackathon / grant
    deadline = Column(Date)
    source = Column(String)
    apply_link = Column(String)
    eligibility = Column(String)
