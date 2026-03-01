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
    fi
    echo -n "."
    sleep 1
done

# 2. Run Seed Script
echo "🌱 Seeding Database with 10+ samples for each role..."
docker exec -i together-db mysql -u root -proot together_db < seed.sql

echo "----------------------------------------------------"
echo "🎉 Setup Complete!"
echo "----------------------------------------------------"
echo "🔑 LOGIN CREDENTIALS (Password: together123 for all)"
echo "----------------------------------------------------"
echo "Admin      : sunita@example.com OR sunita"
echo "Volunteer  : shubham@example.com OR shubham"
echo "User       : anjali@example.com OR anjali"
echo "----------------------------------------------------"
echo "⚠️  REMINDER: Set Ports 3000 and 8080 to PUBLIC in the 'Ports' tab!"
echo "----------------------------------------------------"
