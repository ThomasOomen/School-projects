using UnityEngine;
using UnityEngine.SceneManagement;

public class GameOver : MonoBehaviour
{
    public void BackToLevelSelector()
    {
        SceneManager.LoadScene("LevelSelector");
    }
}
