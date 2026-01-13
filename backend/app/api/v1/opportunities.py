from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.api import deps
from app.schemas.opportunity import Opportunity, OpportunityCreate
from app.crud import crud_opportunity
from app.db.models.user import User

router = APIRouter()

TRUSTED_MAPPING = {
    "internship": "Internshala",
    "hackathon": "Devpost",
    "scholarship": "Scholarships.com",
    "grant": "Govt Portal"
}
TRUSTED_SOURCES = list(TRUSTED_MAPPING.values())

@router.get("/", response_model=List[Opportunity])
def read_opportunities(
    type: Optional[str] = None,
    interest: Optional[str] = None,
    month: Optional[int] = None,
    db: Session = Depends(get_db)
):
    opportunities = crud_opportunity.get_opportunities(db, type=type, interest=interest, month=month)
    return [o for o in opportunities if o.source in TRUSTED_SOURCES]

@router.post("/", response_model=Opportunity)
def create_opportunity(
    *,
    db: Session = Depends(get_db),
    opportunity_in: OpportunityCreate,
    current_user: User = Depends(deps.get_current_user)
):
    expected_source = TRUSTED_MAPPING.get(opportunity_in.type.lower())
    if not expected_source or opportunity_in.source != expected_source:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid source for {opportunity_in.type}. Expected: {expected_source}"
        )
    return crud_opportunity.create_opportunity(db, obj_in=opportunity_in)

@router.post("/{opportunity_id}/apply")
def apply_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    return crud_opportunity.apply_to_opportunity(db, user_id=current_user.id, opportunity_id=opportunity_id)

@router.get("/my-applications", response_model=List[Opportunity])
def read_my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    return crud_opportunity.get_user_applications(db, user_id=current_user.id)
