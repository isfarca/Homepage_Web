// Class 'PlayerMoves'.
let PlayerMoves =
{
    // Player attack.
    Attack: function()
    {
        // Calculate damage.
        let calculateBaseDamage;
        if (playerInstance.mana > 0)
        {
            calculateBaseDamage = playerInstance.strength * playerInstance.mana / 1000;
        }
        else
        {
            calculateBaseDamage = playerInstance.strength * playerInstance.agility / 1000;
        }

        // Set random offset damage.
        let offsetDamage = Math.floor(Math.random() * Math.floor(10));

        // Set damage.
        let calculateOutputDamage = calculateBaseDamage + offsetDamage;

        // Set random number of hits.
        let numberOfHits = Math.floor(Math.random() * Math.floor(playerInstance.agility / 10) / 2) + 1;

        // Save attack values.
        return [calculateOutputDamage, numberOfHits];
    }
};