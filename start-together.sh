#!/bin/bash
# Together For Her - Startup & Seed Script

echo "🚀 Starting Together For Her in Codespaces..."

# 1. Build and Start Containers
docker-compose down
docker-compose up -d --build

echo "⏳ Waiting for Database to be ready (30s)..."
# Simple wait loop for MySQL
for i in {1..30}; do
    if docker exec together-db mysqladmin ping -h localhost -u root -proot --silent; then
        echo "✅ Database is UP!"
        break
    else
        echo -n "."
        sleep 2
    fi
done

# 2. Run Seed Script
echo ""
echo "🌱 Seeding Database with 10+ samples for each role..."
# Using --force to bypass minor errors and --verbose for visibility
docker exec -i together-db mysql -u root -proot together_db < seed.sql

echo "----------------------------------------------------"
echo "🔍 VERIFYING SEED DATA..."
USER_COUNT=$(docker exec -i together-db mysql -u root -proot together_db -N -s -e "SELECT COUNT(*) FROM user_credentials;")
echo "Found $USER_COUNT user accounts in database."

if [ "$USER_COUNT" -gt 0 ]; then
    echo "✅ SEEDING SUCCESSFUL!"
else
    echo "❌ SEEDING FAILED! (Check for SQL syntax errors)"
fi

echo "----------------------------------------------------"
echo "🎉 Setup Complete!"
echo "----------------------------------------------------"
echo "🔑 LOGIN CREDENTIALS (Password: together123 for all)"
echo "----------------------------------------------------"
echo "Admin      : sunita"
echo "Volunteer  : shubham"
echo "User       : anjali"
echo "----------------------------------------------------"
echo "⚠️  REMINDER: Set Ports 3000 and 8080 to PUBLIC in the 'Ports' tab!"
echo "----------------------------------------------------"
