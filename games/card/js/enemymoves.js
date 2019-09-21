// Class 'EnemyMoves'.
let EnemyMoves =
{
    // Enemy attack.
    Attack: function()
    {
        // Calculate damage.
        let calculateBaseDamage;
        if (enemyInstance.mana > 0)
        {
            calculateBaseDamage = enemyInstance.strength * enemyInstance.mana / 1000;
        }
        else
        {
            calculateBaseDamage = enemyInstance.strength * enemyInstance.agility / 1000;
        }

        // Set random offset damage.
        let offsetDamage = Math.floor(Math.random() * Math.floor(10));

        // Set damage.
        let calculateOutputDamage = calculateBaseDamage + offsetDamage;

        // Set random number of hits.
        let numberOfHits = Math.floor(Math.random() * Math.floor(enemyInstance.agility / 10) / 2) + 1;

        return [calculateOutputDamage, numberOfHits];
    }
};