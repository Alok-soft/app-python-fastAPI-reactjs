from typing import Optional
from pydantic import BaseModel, field_validator

class UserSchema(BaseModel):
    fname: str
    mname: str | None = None 
    # mname: Optional[str] = None
    lname: str
    username: str
    password: str
    email_id: str
    mobile_no: str

     # Validate and format names automatically
    @field_validator("fname", "mname", "lname", mode="before")
    @classmethod
    def capitalize_names(cls, v: str | None) -> str | None:
        if isinstance(v, str):
            # .strip() removes extra spaces, .title() makes "john doe" -> "John Doe"
            return v.strip().title()
        return v

class UserResponceSchema(BaseModel):
    fname: str
    mname: str | None = None 
    lname: str
    email_id: str
    mobile_no: str

class LoginSchema(BaseModel):
    username: str
    password: str