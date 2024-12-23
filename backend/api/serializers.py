
# Goal Serializer
def serialize_goal(goal):
    return {
        "id": str(goal["_id"]),
        "goal_name": goal.get("goal_name"),
        "target_amount": goal.get("target_amount"),
        "target_date": goal.get("target_date").isoformat() if goal.get("target_date") else None,
        "priority": goal.get("priority", 3),
        "progress": goal.get("progress", 0),
        "date_of_complete": goal.get("date_of_complete").isoformat() if goal.get("date_of_complete") else None,
        "state": goal.get("state", "In Progress"),
        "created_at": goal.get("created_at").isoformat() if goal.get("created_at") else None,
        "updated_at": goal.get("updated_at").isoformat() if goal.get("updated_at") else None
    }
