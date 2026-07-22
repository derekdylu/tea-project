import unittest

from pydantic import ValidationError

from backend.models import Game, UpdateGame


class GameModelTests(unittest.TestCase):
  def test_accepts_initial_game_payload(self):
    game = Game(
      selection=[],
      selected=[],
      decision=-1,
      timestamp=1_700_000_000_000,
      shown=False,
    )

    self.assertEqual(game.decision, -1)
    self.assertEqual(game.timestamp, "1700000000000")

  def test_rejects_out_of_range_decision(self):
    with self.assertRaises(ValidationError):
      UpdateGame(decision=99)

  def test_rejects_oversized_selection(self):
    with self.assertRaises(ValidationError):
      UpdateGame(selection=[0] * 32)


if __name__ == "__main__":
  unittest.main()
