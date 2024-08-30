"""license key usage

Revision ID: 2316884d8266
Revises: da4a22a5134f
Create Date: 2024-08-20 16:10:29.767173

"""

import sqlalchemy as sa
from alembic import op

# Polar Custom Imports

# revision identifiers, used by Alembic.
revision = "2316884d8266"
down_revision = "da4a22a5134f"
branch_labels: tuple[str] | None = None
depends_on: tuple[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("license_keys", sa.Column("usage", sa.Integer(), nullable=False))
    op.add_column("license_keys", sa.Column("limit_usage", sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("license_keys", "limit_usage")
    op.drop_column("license_keys", "usage")
    # ### end Alembic commands ###