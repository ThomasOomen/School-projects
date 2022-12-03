using UnityEngine;
using UnityEngine.UI;
using System.Linq;

public class RemovingHighscores : MonoBehaviour
{
    // Update is called once per frame
    void Update()
    {
        
    }

    public void RemoveHighscores()
    {
        PlayerPrefs.DeleteAll();
        UpdateGUI();
    }
    public void UpdateGUI()
    {
        var ScoreTexts = Resources.FindObjectsOfTypeAll<Text>().Where(obj => obj.name == "ScoreText");

        foreach(Text child in ScoreTexts)
        {
            child.text = "0";
        }
    }
}
