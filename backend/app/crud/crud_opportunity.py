from sqlalchemy.orm import Session
from sqlalchemy import extract
from app.db.models.opportunity import Opportunity
from app.db.models.application import Application
from app.schemas.opportunity import OpportunityCreate
from typing import Optional

def get_opportunities(
    db: Session, 
    type: Optional[str] = None, 
    interest: Optional[str] = None, 
    month: Optional[int] = None
):
    query = db.query(Opportunity)
    if type:
        query = query.filter(Opportunity.type == type)
    if interest:
        query = query.filter(Opportunity.eligibility.ilike(f"%{interest}%"))
    if month:
        query = query.filter(extract('month', Opportunity.deadline) == month)
    return query.all()

def create_opportunity(db: Session, obj_in: OpportunityCreate):
    db_obj = Opportunity(**obj_in.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def apply_to_opportunity(db: Session, user_id: int, opportunity_id: int):
    db_obj = Application(user_id=user_id, opportunity_id=opportunity_id)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_user_applications(db: Session, user_id: int):
    return db.query(Opportunity).join(Application).filter(Application.user_id == user_id).all()
