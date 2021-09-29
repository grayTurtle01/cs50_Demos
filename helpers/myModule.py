import csv
import random

def get_probabilities_world_cup(file_name, N_simulations):
    N = int(N_simulations)

    f = open(file_name, "r")
    reader = csv.reader(f)
    next(reader)

    teams = []
    for row in reader:
      team = {}
      team['team'] = row[0]
      team['rating'] = int(row[1])
      teams.append(team)

    
    counts = {}
    # TODO: Simulate N tournaments and keep track of win counts
    for team in teams:
      name = team['team']
      counts[name] = 0

    for i in range(N):
      winner = simulate_tournament(teams)
      counts[winner] += 1
      

    # Save each team's chances of winning, according to simulation
    probabilities = []
    for team in sorted(counts, key=lambda team: counts[team], reverse=True):
        #print(f"{team}: {counts[team] * 100 / N:.1f}% chance of winning")
        row = f"{team}: {counts[team] * 100 / N:.1f}%"
        
        probabilities.append(row)

    # Cap first places
    probabilities = probabilities[0:10]

    return probabilities
    
def simulate_game(team1, team2):
    """Simulate a game. Return True if team1 wins, False otherwise."""
    rating1 = team1["rating"]
    rating2 = team2["rating"]
    probability = 1 / (1 + 10 ** ((rating2 - rating1) / 600))
    return random.random() < probability


def simulate_round(teams):
    """Simulate a round. Return a list of winning teams."""
    winners = []

    # Simulate games for all pairs of teams
    for i in range(0, len(teams), 2):
        if simulate_game(teams[i], teams[i + 1]):
            winners.append(teams[i])
        else:
            winners.append(teams[i + 1])

    return winners


def simulate_tournament(teams):
    """Simulate a tournament. Return name of winning team."""
    # TODO
    while len(teams) > 1 :
      teams = simulate_round(teams)

    winner_team = teams[0]
    winner = teams[0]['team']
    return winner

