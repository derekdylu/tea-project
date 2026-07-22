import unittest

from backend.calculate import GROUND, similarity


class SimilarityTests(unittest.TestCase):
  def test_returns_at_least_one_valid_tea(self):
    selected = similarity([0] * len(GROUND[0]))

    self.assertTrue(selected)
    self.assertTrue(all(0 <= tea_id < len(GROUND) for tea_id in selected))

  def test_rejects_incomplete_selections(self):
    with self.assertRaises(ValueError):
      similarity([0])


if __name__ == "__main__":
  unittest.main()
