"""Add Account.processor_fees_applicable and Transaction.platform_fee_type

Revision ID: 9a807baeceec
Revises: eb5ad8374d1b
Create Date: 2024-02-26 11:26:52.398195

"""
import sqlalchemy as sa
from alembic import op

# Polar Custom Imports
from polar.kit.extensions.sqlalchemy import PostgresUUID

# revision identifiers, used by Alembic.
revision = "9a807baeceec"
down_revision = "eb5ad8374d1b"
branch_labels: tuple[str] | None = None
depends_on: tuple[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "accounts", sa.Column("processor_fees_applicable", sa.Boolean(), nullable=True)
    )

    op.execute("UPDATE accounts SET processor_fees_applicable = FALSE")

    op.alter_column(
        "accounts", "processor_fees_applicable", nullable=False, existing_nullable=True
    )

    op.add_column(
        "transactions", sa.Column("platform_fee_type", sa.String(), nullable=True)
    )
    op.create_index(
        op.f("ix_transactions_platform_fee_type"),
        "transactions",
        ["platform_fee_type"],
        unique=False,
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_transactions_platform_fee_type"), table_name="transactions")
    op.drop_column("transactions", "platform_fee_type")
    op.drop_column("accounts", "processor_fees_applicable")
    # ### end Alembic commands ###