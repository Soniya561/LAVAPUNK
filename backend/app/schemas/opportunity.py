from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import date

class OpportunityBase(BaseModel):
    title: str
    type: str # internship / scholarship / hackathon / grant
    deadline: date
    source: str
    link: str
    eligibility: Optional[str] = None

class OpportunityCreate(OpportunityBase):
    pass

class Opportunity(OpportunityBase):
    id: int

    class Config:
        from_attributes = True

class OpportunityFilter(BaseModel):
    type: Optional[str] = None
    interest: Optional[str] = None
    month: Optional[int] = None
