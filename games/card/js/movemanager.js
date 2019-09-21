// Class 'MoveManager'.
let MoveManager =
{
    CalculateAttack: function()
    {
        if (playerInstance.speed >= enemyInstance.speed) // Player have more speed, than enemy.
        {
            // Get player attack values.
            let playerAttackValues = PlayerMoves.Attack();

            // Calculate total damage.
            let totalDamage = playerAttackValues[0] * playerAttackValues[1];

            // Damage for enemy.
            enemyInstance.health = enemyInstance.health - totalDamage;
            setTimeout(function()
            {
                alert("Du triffst " + playerAttackValues[0] + " Schaden, Multiplikator " + playerAttackValues[1] + "!");
            }, 200);

            if (enemyInstance.health <= 0) // Enemy hasn't health.
            {
                // Refresh player / enemy health values.
                document.querySelector(".playerHealth").innerHTML = 'Leben: ' + playerInstance.health;
                document.querySelector(".enemyHealth").innerHTML = 'Leben: 0';

                // Output.
                setTimeout(function()
                {
                    alert("Du hast gewonnen!");
                    location.reload();
                }, 200);
            }
            else // Enemy has health.
            {
                // Refresh enemy health.
                document.querySelector(".enemyHealth").innerHTML = 'Leben: ' + enemyInstance.health;

                // Enemy attacks.
                let enemyAttackValues = EnemyMoves.Attack();
                let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];

                // Damage for player.
                playerInstance.health = playerInstance.health - totalDamage;
                setTimeout(function()
                {
                    alert("Gegner trifft " + enemyAttackValues[0] + " Schaden, Multiplikator " + enemyAttackValues[1] + "!");
                }, 200);

                if (playerInstance.health <= 0) // Player hasn't health.
                {
                    // Refresh player / enemy health values.
                    document.querySelector(".playerHealth").innerHTML = 'Leben: 0';
                    document.querySelector(".enemyHealth").innerHTML = 'Leben: ' + enemyInstance.health;

                    // Output.
                    setTimeout(function()
                    {
                        alert("Du hast verloren!");
                        location.reload();
                    }, 200);
                }
                else // Player has health.
                {
                    // Refresh player health.
                    document.querySelector(".playerHealth").innerHTML = 'Leben: ' + playerInstance.health;
                }
            }
        }
        else if (enemyInstance.speed >= playerInstance.speed) // Enemy have more speed, than player.
        {
            // Get enemy attack values.
            let enemyAttackValues = EnemyMoves.Attack();

            // Calculate total damage.
            let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];

            // Damage for player.
            playerInstance.health = playerInstance.health - totalDamage;
            setTimeout(function()
            {
                alert("Gegner trifft " + enemyAttackValues[0] + " Schaden, Multiplikator " + enemyAttackValues[1] + "!");
            }, 200);

            if (playerInstance.health <= 0) // Player hasn't health.
            {
                // Refresh player / enemy health values.
                document.querySelector(".playerHealth").innerHTML = 'Leben: 0';
                document.querySelector(".enemyHealth").innerHTML = 'Leben: ' + enemyInstance.health;

                // Output.
                setTimeout(function()
                {
                    alert("Du hast verloren!");
                    location.reload();
                }, 200);
            }
            else // Player has health.
            {
                // Refresh player health.
                document.querySelector(".playerHealth").innerHTML = 'Leben: ' + playerInstance.health;

                // Player attacks.
                let playerAttackValues = PlayerMoves.Attack();
                let totalDamage = playerAttackValues[0] * playerAttackValues[1];

                // Damage for enemy.
                enemyInstance.health = enemyInstance.health - totalDamage;
                setTimeout(function()
                {
                    alert("Du triffst " + playerAttackValues[0] + " Schaden, Multiplikator " + playerAttackValues[1] + "!");
                }, 200);

                if (enemyInstance.health <= 0) // Enemy hasn't health.
                {
                    // Refresh player / enemy health values.
                    document.querySelector(".playerHealth").innerHTML = 'Leben: ' + playerInstance.health;
                    document.querySelector(".enemyHealth").innerHTML = 'Leben: 0';

                    // Output.
                    setTimeout(function()
                    {
                        alert("Du hast gewonnen!");
                        location.reload();
                    }, 200);
                }
                else // Enemy has health.
                {
                    // Refresh enemy health.
                    document.querySelector(".enemyHealth").innerHTML = 'Leben: ' + enemyInstance.health;
                }
            }
        }
    }
};